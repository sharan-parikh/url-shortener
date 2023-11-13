import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
    tableName: 'users'
})
export class User extends Model {
    
    @Column({
        field: 'user_id',
        type: DataType.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @Column({
        field: 'username',
        type: DataType.STRING(64),
    })
    username: string;

    @Column({
        field: 'tier_code',
        type: DataType.STRING(5),
    })
    tier: string;

    @Column({
        field: 'date_created',
        type: DataType.DATE,
        defaultValue: DataType.NOW
    })
    dateCreated: number;
}