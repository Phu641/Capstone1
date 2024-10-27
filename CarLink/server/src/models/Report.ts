import { Table, Column, Model, ForeignKey, DataType, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Booking } from './Booking';

@Table({
  tableName: 'reports',
  timestamps: true,
})
export class Report extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  reportID!: number;

  @ForeignKey(() => Booking)
  @Column(DataType.INTEGER)
  bookingID!: number;

  @Column(DataType.STRING)
  idCard!: string;

  @Column(DataType.DATE)
  returnDate!: Date;

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.STRING)
  damageVideo!: string;

  @BelongsTo(() => Booking)
  booking!: Booking;
}
