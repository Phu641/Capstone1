import { Table, Column, Model, ForeignKey, DataType, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Booking } from './Booking';
import { Wallet } from './Wallet';

@Table({
  tableName: 'transactions',
  timestamps: true,
})
export class Transaction extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  transactionID!: number;

  @ForeignKey(() => Booking)
  @Column(DataType.INTEGER)
  bookingID!: number;

  @ForeignKey(() => Wallet)
  @Column(DataType.INTEGER)
  walletID!: number;

  @Column(DataType.INTEGER)
  paycode!: number;

  @Column(DataType.STRING)
  paymentMode!: string;

  @Column(DataType.STRING)
  paymentResponse!: string;

  @Column(DataType.STRING)
  status!: string;

  @BelongsTo(() => Booking)
  booking!: Booking;

  @BelongsTo(() => Wallet)
  wallet!: Wallet;
}
