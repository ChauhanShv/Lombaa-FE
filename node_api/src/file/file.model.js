const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = require("../modules/sequelize").service;

class File extends Model {}

File.init(
  {
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: Sequelize.UUIDV4 },
    key_name: { type: DataTypes.STRING(255), allowNull: true },
    extension: { type: DataTypes.STRING(10), allowNull: true },
    name: { type: DataTypes.STRING(255), allowNull: true },
    mime: { type: DataTypes.STRING(50), allowNull: true },
    relative_path: { type: DataTypes.STRING(255), allowNull: true },
    absolute_path: { type: DataTypes.STRING(255), allowNull: true },
    location: { type: DataTypes.ENUM("s3", "local"), allowNull: true, defaultValue: "local" },
  },
  {
    modelName: "files",
    tableName: "files",
    timestamps: true,
    sequelize,
    paranoid: true,
    defaultScope: {
      attributes: {
        exclude: ["createdAt", "updatedAt", "extension", "key_name", "relative_path", "location", "name", "mime", "absolute_path", "deletedAt"],
        include: [["absolute_path", "url"]],
      },
    },
  }
);

module.exports = File;
