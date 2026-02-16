const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/user");
const { sendMail } = require("../config/sendmail");

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, plan: user.plan },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || "30d" },
  );
}
function normalizeEmail(email) {
  return String(email || "")
    .trim()
    .toLowerCase();
}

function validatePassword(pw) {
  // keep simple; upgrade later
  return typeof pw === "string" && pw.length >= 6;
}

// ✅ REGISTER
const register = async (req, res) => {
  try {
    const name = String(req.body?.name || "").trim();
    const number = String(req.body?.number);
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email, password required" });
    }
    if (!validatePassword(password)) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists)
      return res.status(409).json({ message: "Email already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, number, passwordHash });

    const token = signToken(user);
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ LOGIN
const login = async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");

    if (!email || !password) {
      return res.status(400).json({ message: "email, password required" });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    return res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        plan: user.plan,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ ME (auth middleware sets req.user)
const me = async (req, res) => {
  return res.status(200).json({
    user: {
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      plan: req.user.plan,
      createdAt: req.user.created_at,
    },
  });
};

// ✅ FORGOT PASSWORD (send reset link)
const forgotPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    if (!email) return res.status(400).json({ message: "email required" });

    const user = await User.findOne({ where: { email } });

    // ✅ Always return same response (prevents email enumeration)
    const generic = {
      message: "If the email exists, a reset link has been sent.",
    };
    if (!user) return res.json(generic);

    // raw token -> email, hashed token -> DB
    const rawToken = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto
      .createHash("sha256")
      .update(rawToken)
      .digest("hex");

    user.resetTokenHash = tokenHash;
    user.resetTokenExpiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 min
    await user.save();

    const web = process.env.PUBLIC_WEB_UR || "http://localhost:3000";
    const resetLink = `${web}/auth/reset-password?token=${rawToken}&email=${encodeURIComponent(email)}`;

    await sendMail({
      to: email,
      subject: "Reset your password",
      html: `
        <p>You requested a password reset.</p>
        <p><a href="${resetLink}">Click here to reset your password</a></p>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    return res.json(generic);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ RESET PASSWORD (token + email)
const resetPassword = async (req, res) => {
  try {
    const email = normalizeEmail(req.body?.email);
    const token = String(req.body?.token || "").trim();
    const newPassword = String(req.body?.password || "");

    if (!email || !token || !newPassword) {
      return res
        .status(400)
        .json({ message: "email, token, newPassword required" });
    }
    if (!validatePassword(newPassword)) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({ where: { email } });
    if (!user || !user.resetTokenHash) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    const expired =
      !user.resetTokenExpiresAt ||
      new Date(user.resetTokenExpiresAt).getTime() < Date.now();
    if (expired || user.resetTokenHash !== tokenHash) {
      return res
        .status(400)
        .json({ message: "Invalid or expired reset token" });
    }

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.resetTokenHash = null;
    user.resetTokenExpiresAt = null;
    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ✅ CHANGE PASSWORD (logged-in user)
const changePassword = async (req, res) => {
  try {
    const userId = req.user?.id;
    const currentPassword = String(req.body?.currentPassword || "");
    const newPassword = String(req.body?.newPassword || "");

    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "currentPassword, newPassword required" });
    }
    if (!validatePassword(newPassword)) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const user = await User.findByPk(userId);
    if (!user) return res.status(401).json({ message: "Unauthorized" });

    const ok = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!ok)
      return res.status(401).json({ message: "Invalid current password" });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    await user.save();

    return res.json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  register,
  login,
  me,
  forgotPassword,
  resetPassword,
  changePassword,
};
