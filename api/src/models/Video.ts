import {
  AllowNull,
  Column,
  DataType,
  Default,
  Model,
  PrimaryKey,
  Table,
} from "@canmingir/link-express/sequelize";

@Table({
  tableName: "Video",
  timestamps: false,
  underscored: true,
})
class Video extends Model {
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column(DataType.UUID)
  declare id: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare title: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare description: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare thumbnail: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare videoUrl: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare duration: string;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare views: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare likes: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  declare dislikes: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare channelName: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  declare channelAvatar: string;

  @AllowNull(false)
  @Column(DataType.DATE)
  declare uploadDate: Date;

  @AllowNull(false)
  @Column(DataType.JSONB)
  declare tags: string[];
}

export default Video;
