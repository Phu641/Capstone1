import { Table, Column, Model, ForeignKey, DataType, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Customer } from '.';

@Table({
  tableName: 'comments',
  timestamps: true
})
export class Comment extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  commentID!: number;

  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  customerID!: number;

  @Column(DataType.STRING)
  comment!: string;

  @Column(DataType.DATE)
  date!: Date;

  @BelongsTo(() => Customer)
  customers!: Customer;
}
