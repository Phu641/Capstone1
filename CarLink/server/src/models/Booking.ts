import { Table, Column, Model, ForeignKey, DataType, BelongsTo, PrimaryKey, AutoIncrement, HasOne } from 'sequelize-typescript';
import { Car, Transaction, Report } from '.';

@Table({
  tableName: 'bookings',
  timestamps: true
})
export class Booking extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  bookingID!: number;

  @ForeignKey(() => Car)
  @Column(DataType.INTEGER)
  carID!: number;

  @Column(DataType.DATE)
  bookingDate!: Date;

  @Column(DataType.DATE)
  untilDate!: Date;

  @Column(DataType.DECIMAL)
  totalAmount!: number;

  @Column(DataType.STRING)
  bookingStatus!: string;

  @BelongsTo(() => Car)
  cars!: Car;

  @HasOne(() => Report)
  report!: Report;

  @HasOne(() => Transaction)
  transactions!: Transaction;
}
