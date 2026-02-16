const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const File = sequelize.define(
  "File",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    userId: { type: DataTypes.INTEGER, allowNull: true },

    code: { type: DataTypes.STRING(40), allowNull: false, unique: true },
    originalName: { type: DataTypes.STRING(255), allowNull: false },
    storedName: { type: DataTypes.STRING(255), allowNull: false },
    storedPath: { type: DataTypes.STRING, allowNull: false },
    mimeType: { type: DataTypes.STRING(120), allowNull: true },
    size: { type: DataTypes.INTEGER, allowNull: true },

    downloads: { type: DataTypes.INTEGER, defaultValue: 0 },
    expiresAt: { type: DataTypes.DATE, allowNull: true },
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
    tableName: "files",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  },
);

module.exports = File;
