const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Click = sequelize.define(
  "Click",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    linkId: { type: DataTypes.INTEGER, allowNull: false,field: "link_id" },

    ip: { type: DataTypes.STRING(64), allowNull: true },
    userAgent: { type: DataTypes.TEXT, allowNull: true,field: "user_agent"},
    referer: { type: DataTypes.TEXT, allowNull: true },

    country: { type: DataTypes.STRING(60), allowNull: true },
    device: { type: DataTypes.STRING(60), allowNull: true },
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
    tableName: "clicks",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  },
);

module.exports = Click;
