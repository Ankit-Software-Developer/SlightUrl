
const express = require("express");
const fs = require("fs");
const { nanoid } = require("nanoid");
const  Files  = require("../models/File"); // adjust to your export

function isExpired(row) {
  return new Date(row.expiresAt).getTime() <= Date.now();
}

const uploadfile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "File is required" });

    const code = nanoid(6); // AbC123 style length 6
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // +1 day

    const row = await Files.create({
      code,
      originalName: req.file.originalname,
      storedName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      storedPath: req.file.path, // full disk path
      expiresAt,
    });

    const shareUrl = `${process.env.PUBLIC_BASE_URL || "http://localhost:3000"}/download?${code}`;

    return res.json({
      message: "Uploaded successfully",
      code,
      shareUrl,
      expiresAt,
      file: {
        name: row.originalName,
        sizeBytes: row.size,
        mimeType: row.mimeType,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// GET /api/files/:code/meta (public) - used by download page UI
const getfile = async (req, res) => {
  try {
    const { code } = req.params;
    const row = await Files.findOne({ where: { code } });
    if (!row) return res.status(404).json({ message: "File not found" });

    if (isExpired(row))
      return res.status(410).json({ message: "Link expired" });

    return res.json({
      code: row.code,
      name: row.originalName,
      sizeBytes: row.size,
      mimeType: row.mimeType,
      expiresAt: row.expiresAt,
      downloadedCount: row.downloads,
      downloadUrl: `api/files/${row.code}/download`,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

// GET /api/files/:code/download (public) - streams file
const downloadfile = async (req, res) => {
  try {
    const { code } = req.params;
    const row = await Files.findOne({ where: { code } });
    if (!row) return res.status(404).send("Not found");

    if (isExpired(row)) return res.status(410).send("Expired");

    // file might be deleted already
    if (!fs.existsSync(row.storedPath))
      return res.status(404).send("File missing");

    // increment counter (best-effort)
    row.downloads = (row.downloads || 0) + 1;
    await row.save();

    res.setHeader("Content-Type", row.mimeType ||  "application/octet-stream");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${encodeURIComponent(row.originalName)}"`,
    );

    return fs.createReadStream(row.storedPath).pipe(res);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
};

module.exports = {
  uploadfile,
  getfile,
  downloadfile
};
