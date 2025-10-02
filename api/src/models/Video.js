const platform = require("@canmingir/link-express");
const {
  Postgres: { sequelize },
} = platform.module();
const { DataTypes, UUIDV4 } = platform.require("sequelize");

const Video = sequelize.define("Video", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  views: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dislikes: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  channelName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  channelAvatar: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  uploadDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  tags: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
});

module.exports = Video;
