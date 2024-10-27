import { Table, Column, Model, ForeignKey, DataType, BelongsTo, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Car } from './Car';

@Table({
  tableName: 'overviews',
  timestamps: true
})
export class Overview extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  overviewID!: number;

  @ForeignKey(() => Car)
  @Column(DataType.INTEGER)
  carID!: number;

  @Column(DataType.STRING)
  model!: string;

  @Column(DataType.STRING)
  type!: string;

  @Column(DataType.DATE)
  year!: Date;

  @Column(DataType.STRING)
  transmission!: string;

  @Column(DataType.STRING)
  fuelType!: string;

  @Column(DataType.INTEGER)
  seats!: number;

  @Column(DataType.DECIMAL)
  pricePerDay!: number;

  @Column(DataType.STRING)
  address!: string;

  @Column(DataType.STRING)
  description!: string;

  @BelongsTo(() => Car)
  car!: Car;
}
