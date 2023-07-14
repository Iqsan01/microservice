import { Request, Response, NextFunction } from "express";
import { editVendorInput, vendorLoginInput } from "../dto";
import { findVendor } from "./adminController";
import { generateSignature, validatePassword } from "../utillity";


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

    res.json({ "message": "Vendor infomation not found" });
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

    res.json({ "message": "Vendor infomation not found" });
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

    res.json({ "message": "Vendor infomation not found" });
}