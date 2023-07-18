import { Request, Response, NextFunction } from "express";
import { editVendorInput, foodInput, vendorLoginInput } from "../dto";
import { findVendor } from "./adminController";
import { generateSignature, validatePassword } from "../utillity";
import { Food } from "../models";


export const vendorLogin = async (req: Request, res: Response, next: NextFunction) => {

    const { email, password } = <vendorLoginInput>req.body;

    const existingUser = await findVendor('', email);

    if (existingUser !== null) {

        const validation = await validatePassword(password, existingUser.password, existingUser.salt);
        if (validation) {

            const signature = await generateSignature({
                _id: existingUser._id,
                email: existingUser.email,
                name: existingUser.name
            })
            return res.json(signature);
        }
    }

    return res.json({ 'message': 'Login credential is not valid' })

}


export const getVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (user) {
        const existingVendor = await findVendor(user._id);
        return res.json(existingVendor);
    }

    return res.json({ "message": "Vendor infomation not found" });
}

export const updateVendorProfile = async (req: Request, res: Response, next: NextFunction) => {

    const { name, address, phone, foodTypes } = <editVendorInput>req.body;
    const user = req.user;

    if (user) {
        const existingVendor = await findVendor(user._id);
        if (existingVendor !== null) {

            existingVendor.name = name;
            existingVendor.address = address;
            existingVendor.phone = phone;
            existingVendor.foodType = foodTypes

            const saveResult = await existingVendor.save();
            return res.json(saveResult);
        }
        return res.json(existingVendor);
    }

    return res.json({ "message": "Vendor infomation not found" });
}

export const updateVendorService = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (user) {
        const existingVendor = await findVendor(user._id);
        if (existingVendor !== null) {
            existingVendor.serviceAvaliable = !existingVendor.serviceAvaliable;
            const saveResult = await existingVendor.save();
            return res.json(saveResult);
        }
        return res.json(existingVendor);
    }

    return res.json({ "message": "Vendor infomation not found" });
}

export const updateVendorCoverImage = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if(user){

        const vendor = await findVendor(user._id);
 
        if(vendor !== null){
 
             const files = req.files as [Express.Multer.File];
 
             const images = files.map((file: Express.Multer.File) => file.filename);
             
             vendor.coverImages.push(...images);
             const result = await vendor.save();
             return res.json(result);
        }
 
     }
    return res.json({ 'message': 'Unable to Update vendor profile ' })
}

export const addFood = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    const { name, description, category, foodType, readyTime, price } = <foodInput>req.body;

    if(user){

        const vendor = await findVendor(user._id);
 
        if(vendor !== null){
 
             const files = req.files as [Express.Multer.File];
 
             const images = files.map((file: Express.Multer.File) => file.filename);
             
             const food = await Food.create({
                 vendorId: vendor._id,
                 name: name,
                 description: description,
                 category: category,
                 price: price,
                 rating: 0,
                 readyTime: readyTime,
                 foodType: foodType,
                 images: images
             })
             
             vendor.foods.push(food);
             const result = await vendor.save();
             return res.json(result);
        }
 
     }
    return res.json({ 'message': 'Unable to Update vendor profile ' })
}

export const getFoods = async (req: Request, res: Response, next: NextFunction) => {

    const user = req.user;

    if (user) {
        const foods = await Food.find({ vendorId: user._id });

        if (foods !== null) {
            return res.json(foods);
        }
    }

    return res.json({ "message": "Foods infomation not found" });
}