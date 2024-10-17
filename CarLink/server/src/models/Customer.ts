import { Table, Column, Model, HasMany, DataType, HasOne, AutoIncrement, AllowNull, PrimaryKey } from 'sequelize-typescript';
import { Role, Car, Favorite, Comment, Transaction } from '.';

@Table({
  tableName: 'customers',
  timestamps: true
})
export class Customer extends Model {
  @AutoIncrement
  @PrimaryKey
  @Column(DataType.INTEGER)
  customerID!: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  idCard!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  email!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password!: string;

  @Column(DataType.STRING)
  firstName!: string;

  @Column(DataType.STRING)
  lastName!: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  phone!: string;

  @Column(DataType.STRING)
  salt!: string;

  @Column(DataType.INTEGER)
  OTP!: number;

  @Column(DataType.DATE)
  otpExpiry!: Date;

  @Column(DataType.INTEGER)
  loyalPoint!: number;

  @Column(DataType.BOOLEAN)
  isVerified!: boolean;

  @Column(DataType.STRING)
  address!: string;

  @HasMany(() => Car)
  cars!: Car[];

  @HasMany(() => Comment)
  comments!: Comment[];

  @HasOne(() => Role)
  role!: Role;

  @HasMany(() => Favorite)
  favorites!: Favorite[];

  @HasMany(() => Transaction)
  transactions!: Transaction[];
}
