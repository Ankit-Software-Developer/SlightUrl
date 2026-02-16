const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Domain = sequelize.define(
  "Domain",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: true },

    host: { type: DataTypes.STRING(180), allowNull: false },
    isVerified: { type: DataTypes.BOOLEAN, defaultValue: false },
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
  { tableName: "domains",timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true, }
);

module.exports = Domain;