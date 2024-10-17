import { Table, Column, Model, ForeignKey, DataType, BelongsTo, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Customer, Favorite, Images } from '.';

@Table({
  tableName: 'cars',
  timestamps: true
})
export class Car extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  carID!: number;

  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  customerID!: number;

  @Column(DataType.STRING)
  name!: string;

  @Column(DataType.DECIMAL)
  pricePerDay!: number;

  @Column(DataType.STRING)
  description!: string;

  @Column(DataType.STRING)
  address!: string;

  @Column(DataType.BOOLEAN)
  isAvailable!: boolean;

  @Column(DataType.BOOLEAN)
  automaticTranmission!: boolean;

  @Column(DataType.BOOLEAN)
  delivery!: boolean;

  @Column(DataType.BOOLEAN)
  selfPickUp!: boolean;

  @Column(DataType.INTEGER)
  seat!: number;

  @Column(DataType.STRING)
  fuel!: string;

  @Column(DataType.STRING)
  fuelConsumption!: string;

   @BelongsTo(() => Customer)
   customer!: Customer;

   // Một chiếc xe có thể có nhiều mục yêu thích
   @HasMany(() => Favorite)
   favorites!: Favorite[];

   @HasMany(() => Images)
   carImages!: Images[];

}
