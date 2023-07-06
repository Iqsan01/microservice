import express, { Request, Response, NextFunction } from "express";
import { createVendorInput } from "../dto";
import { Vendor } from "../models";
import { generatePassword, generateSalt } from "../utillity";

export const createVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    ownerName,
    foodType,
    pincode,
    address,
    phone,
    email,
    password,
  } = <createVendorInput>req.body;

  const exitingEmail = await Vendor.findOne({ email: email });

  if (exitingEmail !== null) {
    return res.json({ message: "This email already use" });
  }

  const salt = await generateSalt();
  const hashPassword = await generatePassword(password, salt);

  const createVendor = await Vendor.create({
    name: name,
    ownerName: ownerName,
    footType: foodType,
    pincode: pincode,
    address: address,
    phone: phone,
    email: email,
    password: hashPassword,
    salt: salt,
    rating: 0,
    serviceAvaliable: false,
    coverImage: [],
  });

  return res.json(createVendor);
};

export const getVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const getVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
