const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Files = sequelize.define(
  "Files",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    code: { type: DataTypes.STRING(32), allowNull: false, unique: true },

    originalName: { type: DataTypes.STRING(255), allowNull: false },
    mimeType: { type: DataTypes.STRING(120), allowNull: false },
    sizeBytes: { type: DataTypes.BIGINT, allowNull: false },

    // where file is stored on server disk
    storedPath: { type: DataTypes.STRING(500), allowNull: false },

    expiresAt: { type: DataTypes.DATE, allowNull: false },
    downloadedCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "files",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  },
);

module.exports = Files;
