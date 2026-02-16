const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    name: { type: DataTypes.STRING(120), allowNull: false },
    number: { type: DataTypes.STRING(160), allowNull: false },
    email: { type: DataTypes.STRING(160), allowNull: false, unique: true },

    passwordHash: { type: DataTypes.STRING(255), allowNull: false },

    plan: {
      type: DataTypes.ENUM("FREE", "PRO", "BUSINESS"),
      allowNull: false,
      defaultValue: "FREE",
    },
    // models/user.js
resetTokenHash: {
  type: DataTypes.STRING(64),
  allowNull: true,
  field: "reset_token_hash",
},
resetTokenExpiresAt: {
  type: DataTypes.DATE,
  allowNull: true,
  field: "reset_token_expires_at",
},

    createdBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "created_by",
    },
    updatedBy: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "updated_by",
    },
  },
  {
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  },
);

module.exports = User;
