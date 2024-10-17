import { Table, Column, Model, ForeignKey, DataType, BelongsTo, PrimaryKey, AutoIncrement, HasMany, HasOne } from 'sequelize-typescript';
import { Customer, Favorite, Images, Overview } from '.';

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

  @Column(DataType.BOOLEAN)
  isAvailable!: boolean;

  @Column(DataType.BOOLEAN)
  delivery!: boolean;

  @Column(DataType.BOOLEAN)
  selfPickUp!: boolean;

   @BelongsTo(() => Customer)
   customer!: Customer;

   // Một chiếc xe có thể có nhiều mục yêu thích
   @HasMany(() => Favorite)
   favorites!: Favorite[];

   @HasMany(() => Images)
   carImages!: Images[];

   @HasOne(() => Overview)
  overview!: Overview;

}
