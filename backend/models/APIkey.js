const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const ApiKey = sequelize.define(
  "ApiKey",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

    // owner of key (registered user)
    userId: { type: DataTypes.INTEGER, allowNull: false },

    name: { type: DataTypes.STRING(80), allowNull: true }, // e.g. "Shopify App"
    keyHash: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    keyverify: { type: DataTypes.STRING(255), allowNull: false, unique: true },
    isActive: { type: DataTypes.BOOLEAN, defaultValue: true },

    // optional limits
    dailyLimit: { type: DataTypes.INTEGER, allowNull: true },
    dailyUsed: { type: DataTypes.INTEGER, defaultValue: 0 },
    dailyUsedAt: { type: DataTypes.DATEONLY, allowNull: true },
  },
  {
    tableName: "api_keys",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    underscored: true,
  },
);

module.exports = ApiKey;
