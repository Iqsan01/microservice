import express, { Request, Response, NextFunction } from "express";
import { getVendorProfile, updateVendorProfile, updateVendorService, vendorLogin } from "../controllers";
import { authenticate } from "../middlewares";

const router = express.Router();

router.post('/login', vendorLogin);

router.use(authenticate);
router.get('/profile', getVendorProfile);
router.patch('/profile', updateVendorProfile);
router.patch('/service', updateVendorService);

router.get('/', (req: Request, res: Response, next: NextFunction ) => {
    res.json({message: "Hello from vendor"});
})

export { router as vendorRoute };

