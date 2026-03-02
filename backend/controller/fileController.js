
const express = require("express");
const fs = require("fs");
const { nanoid } = require("nanoid");
const  Files  = require("../models/File"); // adjust to your export
const { validateUploadFile } = require("../utils/filepolicy");

function isExpired(row) {
  return new Date(row.expiresAt).getTime() <= Date.now();
}

const uploadfile = async (req, res) => {
  try {
    const file = req.file;
    const check = validateUploadFile(file);

    if (!check.ok) {
      if (file?.path) { try { fs.unlinkSync(file.path); } catch {} }
      return res.status(400).json({ message: check.reason });
    }

    const isAnon = !req.user?.id;

    // Anonymous: 1 day. Logged in: you can set longer.
    const expiresAt = isAnon
      ? new Date(Date.now() + 24 * 60 * 60 * 1000)
      : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const code = nanoid(8);

    const row = await Files.create({
      code,
      originalName: check.safeName,
      storedName: file.filename,
      mimeType: file.mimetype,
      size: file.size,
      storedPath: file.path,
      expiresAt,

      ownerUserId: req.user?.id || null,
      createdIp: req.headers["x-forwarded-for"] || req.ip || null,
      createdUa: req.headers["user-agent"] || null,

      // ✅ active for safe types, pending for office/video
      status: check.status, // "active" | "pending"
      blockedReason: null,
    });

    const shareUrl = `${process.env.PUBLIC_BASE_URL || "http://localhost:3000"}/download?code=${code}`;

    return res.json({
      message: check.status === "pending"
        ? "Uploaded successfully (under review)"
        : "Uploaded successfully",
      code,
      shareUrl,
      expiresAt,
      status: row.status,
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
