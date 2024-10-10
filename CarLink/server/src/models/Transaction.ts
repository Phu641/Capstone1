import { Table, Column, Model, ForeignKey, DataType, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Customer } from './Customer';
import { Booking } from './Booking';

@Table({
  tableName: 'transactions',
  timestamps: true
})
export class Transaction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  transactionID!: number;

  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  customerID!: number;

  @ForeignKey(() => Booking)
  @Column(DataType.INTEGER)
  bookingID!: number;

  @Column(DataType.STRING)
  paymentMode!: string;

  @Column(DataType.STRING)
  paymentResponse!: string;

  @Column(DataType.STRING)
  status!: string;

  @BelongsTo(() => Customer)
  customers!: Customer;

  @BelongsTo(() => Booking)
  bookings!: Booking;
}
