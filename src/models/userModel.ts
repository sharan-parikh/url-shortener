import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  Default,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { TierModel } from './tierModel';
import { UrlModel } from './urlModel';

@Table({
  tableName: 'users',
})
export class UserModel extends Model<UserModel> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    field: 'user_id',
    type: DataType.BIGINT,
  })
  id: number;

  @Column({
    field: 'username',
    type: DataType.STRING(64),
    unique: true,
  })
  username: string;

  @ForeignKey(() => TierModel)
  @Column({
    field: 'tier_code',
    type: DataType.STRING(5),
  })
  tierCode: string;

  @Default(0)
  @Column({
    field: 'no_of_requests',
    type: DataType.INTEGER,
  })
  requestCount: number;

  @Column({
    field: 'date_created',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  dateCreated: number;

  @Column({
    field: 'date_updated',
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  dateUpdated: number;

  @BelongsTo(() => TierModel, 'tier_code')
  tier: TierModel;

  @HasMany(() => UrlModel)
  urls: UrlModel[];
}
