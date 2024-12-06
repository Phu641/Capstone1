import {  Table, Column, Model, DataType, PrimaryKey,AutoIncrement, AllowNull, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Customer } from './Customer';
  
@Table({
    tableName: 'withdraw',
    timestamps: true, // Tự động thêm `createdAt` và `updatedAt`
})
export class Withdraw extends Model {
    @AutoIncrement
    @PrimaryKey
    @Column(DataType.INTEGER)
    withdrawID!: number;
  
    @ForeignKey(() => Customer)
    @AllowNull(false)
    @Column(DataType.INTEGER)
    customerID!: number;
  
    @AllowNull(false)
    @Column(DataType.DECIMAL(10, 2))
    amount!: number;
  
    @AllowNull(true)
    @Column(DataType.INTEGER)
    OTP!: number;

    @Column(DataType.DATE)
    otpExpiry!: Date;
  
    @AllowNull(false)
    @Column(DataType.STRING)
    status!: string;
  
    @BelongsTo(() => Customer)
    customer!: Customer;
}
  