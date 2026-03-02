const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Link = sequelize.define(
  "Link",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    userId: { type: DataTypes.INTEGER, allowNull: true },

    code: { type: DataTypes.STRING(40), allowNull: false, unique: true },
    alais: { type: DataTypes.STRING(180), allowNull: true },

    longUrl: { type: DataTypes.TEXT, allowNull: false },
    domain: { type: DataTypes.STRING(180), allowNull: true },

    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },
    clicks: { type: DataTypes.INTEGER, defaultValue: 0 },
    status: {
      type: DataTypes.ENUM("active", "pending", "disabled", "blocked"),
      allowNull: false,
      defaultValue: "active",
    },

    blockedReason: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: "blocked_reason",
    },

    createdIp: {
      type: DataTypes.STRING(64),
      allowNull: true,
      field: "created_ip",
    },

    createdUa: {
      type: DataTypes.STRING(512),
      allowNull: true,
      field: "created_ua",
    },

    lastCheckedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: "last_checked_at",
    },
    expiresAt: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: "expiresAt",
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
    tableName: "links",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  },
);

module.exports = Link;
