import { Table, Column, Model, ForeignKey, DataType, PrimaryKey, AutoIncrement, BelongsTo,} from 'sequelize-typescript';
import { Customer } from './Customer';
  
  @Table({
    tableName: 'wallets',
    timestamps: true,
  })
export class Wallet extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    walletID!: number;
  
    @ForeignKey(() => Customer)
    @Column(DataType.INTEGER)
    customerID!: number;
  
    @Column(DataType.DECIMAL(10, 2))
    balance!: number;
  
    @BelongsTo(() => Customer)
    customer!: Customer;
}
  