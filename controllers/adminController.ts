import express, { Request, Response, NextFunction } from "express";
import { createVendorInput } from "../dto";
import { Vendor } from "../models";
import { generatePassword, generateSalt } from "../utillity";

export const findVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    return await Vendor.findOne({ email: email })
  } else {
    return await Vendor.findById(id)
  }
}

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

  const existingVendor = await findVendor('', email)

  if (existingVendor !== null) {
    return res.json({ "message": "This email already use" });
  }

  const salt = await generateSalt();
  const hashPassword = await generatePassword(password, salt);

  const createVendor = await Vendor.create({
    name: name,
    ownerName: ownerName,
    foodType: foodType,
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
) => {
  const vendors = await Vendor.find();

  if (vendors !== null) {
    return res.json(vendors)
  }

  return res.json({ "message": "Vendors data not avaliable" })
};

export const getVendorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendor = await findVendor(req.params.id);

  if (vendor !== null) {
    return res.json(vendor)
  }

  return res.json({ "message": "Vendors data not avaliable" })
};
