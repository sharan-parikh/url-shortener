import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { UserModel } from './userModel';

@Table({
  tableName: 'tiers',
})
export class TierModel extends Model<TierModel> {
  @Column({
    field: 'tier_code',
    type: DataType.STRING(5),
    primaryKey: true,
  })
  tierCode: string;

  @Column({
    field: 'tier_name',
    type: DataType.STRING(20),
    unique: true,
  })
  tierName: string;

  @Column({
    field: 'max_requests_allowed',
    type: DataType.INTEGER,
  })
  maxRequestsAllowed: number;

  @HasMany(() => UserModel)
  users: UserModel[];
}
