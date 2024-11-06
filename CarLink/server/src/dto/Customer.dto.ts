import { IsEmail, IsEmpty, IsNotEmpty, Length } from "class-validator";


export class CreateCustomerInputs {

    @IsNotEmpty()
    idCard!: string;

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    @Length(6, 20)
    password!: string;

    @IsNotEmpty()
    @Length(2, 12)
    firstName!: string;

    @IsNotEmpty()
    @Length(2, 12)
    lastName!: string;

    @IsNotEmpty()
    @Length(7, 12)
    phone!: string;

    @IsNotEmpty()
    @Length(25, 255)
    address!: string;

}

export class EditCustomerProfileInputs {

    
    @Length(2, 16)
    firstName!: string;

    @Length(2, 16)
    lastName!: string;

    @Length(3, 16)
    address!: string;

}

export class UserLoginInputs {

    @IsEmail()
    email!: string;

    @Length(6, 20)
    password!: string;

}

export interface CustomerPayload {
    customerID: number;
    email: string;
    isVerified: boolean;
}
  