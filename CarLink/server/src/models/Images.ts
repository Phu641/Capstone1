import { Table, Column, Model, ForeignKey, DataType, BelongsTo, PrimaryKey, AutoIncrement, HasMany } from 'sequelize-typescript';
import { Car } from '.';
@Table({
    tableName: 'images',
    timestamps: false,
  })
  export class Images extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    imageID!: number;
  
    @ForeignKey(() => Car)
    @Column(DataType.INTEGER)
    carID!: number;
  
    @Column(DataType.STRING)
    imageUrl!: string;
    
    @BelongsTo(() => Car)
    car!: Car;
  }
  