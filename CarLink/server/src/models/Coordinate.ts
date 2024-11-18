import { Table, Column, Model, ForeignKey, DataType, PrimaryKey, AutoIncrement, BelongsTo } from 'sequelize-typescript';
import { Car } from '.'; // Đường dẫn cần điều chỉnh cho phù hợp với project của bạn

@Table({
  tableName: 'coordinates',
  timestamps: true, // Nếu bạn không cần cột `createdAt` và `updatedAt`, có thể chỉnh `timestamps: false`.
})
export class Coordinate extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  coordinateID!: number;

  @ForeignKey(() => Car)
  @Column(DataType.INTEGER)
  carID!: number;

  @Column(DataType.DOUBLE)
  latitude!: number;

  @Column(DataType.DOUBLE)
  longitude!: number;

  @BelongsTo(() => Car)
  car!: Car;
}
