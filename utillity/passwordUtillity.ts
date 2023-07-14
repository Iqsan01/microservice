import bcrypt from 'bcrypt';
import { Request } from 'express';
import jwt from 'jsonwebtoken';
import { APP_SECRET } from '../config';

import { vendorPayload } from '../dto';
import { authPayload } from '../dto/auth.dto';


export const generateSalt = async () => {
  return await bcrypt.genSalt()
}


export const generatePassword = async (password: string, salt: string) => {

  return await bcrypt.hash(password, salt);

}

export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {

  return await generatePassword(enteredPassword, salt) === savedPassword;
}

export const generateSignature = async (payload: authPayload) => {

  return jwt.sign(payload, APP_SECRET, { expiresIn: '1d' });

}

export const validateSignature = async (req: Request) => {

  const signature = req.get('Authorization');

  if (signature) {
    try {
      const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET) as authPayload;
      req.user = payload;
      return true;

    } catch (err) {
      return false
    }
  }
  return false
};