import { Request } from "express";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { AuthPayload } from "../dto";
import { APP_SECRET } from "../config";

//ENCODE SALT
export const GenerateSalt = async() => {

    return await bcrypt.genSalt();
    
}

//HASH PASSWORD
export const GeneratePassword = async(password: string, salt: string) => {

    return await bcrypt.hash(password, salt);

}

//VALIDATE PASSWORD
export const ValidatePassword = async(enteredPassword: string, savedPassword: string, salt: string) => {

    return await GeneratePassword(enteredPassword, salt) === savedPassword;

}

//GENERATE SIGNATURE
export const GenerateSignature = (payload: AuthPayload) => {

    return jwt.sign(payload, APP_SECRET, {expiresIn: '1h'});

}

//VALIDATE SIGNATURE
export const ValidateSignature = async(req: Request) => {

    const signature = req.get('Authorization');

    if(signature) {

        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as AuthPayload;

        req.user = payload;

        return true;
    }

    return false;

}
