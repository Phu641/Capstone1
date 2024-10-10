import { Table, Column, Model, ForeignKey, DataType, BelongsTo, AllowNull, AutoIncrement, PrimaryKey } from 'sequelize-typescript';
import { Customer } from '.';

@Table({
  tableName: 'roles',
  timestamps: true
})
export class Role extends Model {
@PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  roleID!: number;

  @AllowNull(false)
  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  customerID!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  type!: string;

  @BelongsTo(() => Customer)
  customer!: Customer;
}
