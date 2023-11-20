import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  IsUrl,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { UserModel } from './userModel';
import { validateFormat } from '../utils/urlUtils';

@Table({
  tableName: 'urls',
})
export class UrlModel extends Model<UrlModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    field: 'url_id',
    type: DataType.BIGINT,
  })
  id: number;

  @ForeignKey(() => UserModel)
  @Column({
    field: 'user_id',
    type: DataType.BIGINT,
  })
  userId: number;

  @BelongsTo(() => UserModel)
  user: UserModel;

  @IsUrl
  @Column({
    field: 'original_url',
    type: DataType.STRING,
  })
  originalUrl: string;

  @Column({
    field: 'short_id',
    type: DataType.STRING,
  })
  shortId: string;

  @Column({
    field: 'date_created',
    type: DataType.DATE,
    defaultValue: Date.now(),
  })
  dateCreated: number;

  @Column({
    field: 'date_updated',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  dateUpdated: number;
}
