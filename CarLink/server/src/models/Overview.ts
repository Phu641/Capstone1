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
  listingTitle!: string;

  @Column(DataType.STRING)
  model!: string;

  @Column(DataType.STRING)
  type!: string;

  @Column(DataType.DATE)
  year!: Date;

  @Column(DataType.STRING)
  condition!: string;

  @Column(DataType.INTEGER)
  stockNumber!: number;

  @Column(DataType.INTEGER)
  vinNumber!: number;

  @Column(DataType.INTEGER)
  mileage!: number;

  @Column(DataType.STRING)
  transmission!: string;

  @Column(DataType.STRING)
  driverType!: string;

  @Column(DataType.DECIMAL)
  engineSize!: number;

  @Column(DataType.INTEGER)
  cylinders!: number;

  @Column(DataType.STRING)
  fuelType!: string;

  @Column(DataType.INTEGER)
  doors!: number;

  @Column(DataType.STRING)
  color!: string;

  @Column(DataType.INTEGER)
  seats!: number;

  @Column(DataType.DECIMAL)
  cityMPG!: number;

  @Column(DataType.DECIMAL)
  highwayMPG!: number;

  @Column(DataType.DECIMAL)
  pricePerDay!: number;

  @Column(DataType.STRING)
  address!: string;

  @Column(DataType.STRING)
  description!: string;

  @BelongsTo(() => Car)
  car!: Car;
}
