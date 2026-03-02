// utils/filePolicy.js
const path = require("path");

const MAX_UPLOAD_BYTES_DEFAULT = 25 * 1024 * 1024; // 25 MB
const MAX_UPLOAD_BYTES_VIDEO = 200 * 1024 * 1024; // 200 MB (adjust)

const SAFE_ACTIVE_MIME = new Set([
  // Images
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",

  // Documents
  "application/pdf",
  "text/plain",
]);

const PENDING_MIME = new Set([
  // Office (allowed but pending)
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // docx
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // xlsx
  "application/vnd.openxmlformats-officedocument.presentationml.presentation", // pptx

  // Videos (allowed; you can choose active or pending)
  "video/mp4",
  "video/webm",
  "video/quicktime", // mov
  "video/x-msvideo", // avi
  "video/x-matroska", // mkv (sometimes browser sends different mime)
]);

const BLOCKED_EXT = new Set([
  ".exe",
  ".msi",
  ".bat",
  ".cmd",
  ".ps1",
  ".sh",
  ".js",
  ".jar",
  ".vbs",
  ".dll",
  ".apk",
  ".html",
  ".htm",
  ".svg",
  ".docm",
  ".xlsm",
  ".pptm",
  ".zip",
  ".rar",
  ".7z",
]);

function sanitizeFilename(name = "") {
  return name
    .replace(/[\/\\]/g, "_")
    .replace(/[\x00-\x1F\x7F]/g, "")
    .slice(0, 180);
}

function isVideoMime(mime) {
  return typeof mime === "string" && mime.startsWith("video/");
}

/**
 * Returns:
 *  - ok: boolean
 *  - reason?: string
 *  - safeName?: string
 *  - status?: "active" | "pending"
 *  - maxBytes?: number
 */
function validateUploadFile(file) {
  if (!file) return { ok: false, reason: "File is required" };

  const ext = path.extname(file.originalname || "").toLowerCase();
  const safeName = sanitizeFilename(file.originalname || "file");

  if (BLOCKED_EXT.has(ext)) {
    return { ok: false, reason: `File type not allowed (${ext})` };
  }

  // size limit depends on category
  const maxBytes = isVideoMime(file.mimetype)
    ? MAX_UPLOAD_BYTES_VIDEO
    : MAX_UPLOAD_BYTES_DEFAULT;
  if (file.size > maxBytes) {
    return {
      ok: false,
      reason: `File too large. Max ${Math.round(maxBytes / (200 * 1024 * 1024))}MB`,
    };
  }

  if (SAFE_ACTIVE_MIME.has(file.mimetype)) {
    return { ok: true, safeName, status: "active", maxBytes };
  }

  if (PENDING_MIME.has(file.mimetype)) {
    // Office & video: allowed but pending (recommended)
    return { ok: true, safeName, status: "pending", maxBytes };
  }

  return { ok: false, reason: `MIME type not allowed (${file.mimetype})` };
}

module.exports = {
  validateUploadFile,
  sanitizeFilename,
  MAX_UPLOAD_BYTES_DEFAULT,
  MAX_UPLOAD_BYTES_VIDEO,
};
