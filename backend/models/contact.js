const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Contact = sequelize.define(
  "Contact",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    name: { type: DataTypes.STRING(120), allowNull: false },
    LastName: { type: DataTypes.STRING(120), allowNull: false },
    email: { type: DataTypes.STRING(160), allowNull: false, unique: true },
    Company: { type: DataTypes.STRING(120), allowNull: false },
    Type: { type: DataTypes.STRING(120), allowNull: false },
    Message: { type: DataTypes.STRING(120), allowNull: false },
    status: { type: DataTypes.STRING(120), allowNull: false },
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
    tableName: "Contact",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  },
);

module.exports = Contact;
