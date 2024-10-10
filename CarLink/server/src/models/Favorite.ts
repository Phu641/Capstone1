import { Table, Column, Model, ForeignKey, DataType, BelongsTo, AutoIncrement, PrimaryKey, HasMany } from 'sequelize-typescript';
import { Customer, Car } from '.';

@Table({
  tableName: 'favorites',
  timestamps: true
})
export class Favorite extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  favoriteID!: number;

  @ForeignKey(() => Customer)
  @Column(DataType.INTEGER)
  customerID!: number;

  @ForeignKey(() => Car)
  @Column(DataType.INTEGER)
  carID!: number;

   // Mỗi mục yêu thích thuộc về một khách hàng
   @BelongsTo(() => Customer)
   customer!: Customer;
 
   // Mỗi mục yêu thích thuộc về một chiếc xe
   @BelongsTo(() => Car)
   car!: Car;
  
}
