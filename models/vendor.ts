import mongoose, { Schema, Document, Model } from "mongoose";

interface vendorDoc extends Document {
  name: string;
  ownerName: string;
  footType: [string];
  pincode: string;
  address: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  serviceAvaliable: string;
  coverImage: [string];
  rating: number;
//   foods: any;
}

const vendorSchema = new Schema(
  {
    name: { type: String, required: true },
    ownerName: { type: String, required: true },
    footType: { type: [String] },
    pincode: { type: String, required: true },
    address: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    salt: { type: String, required: true },
    serviceAvaliable: { type: Boolean },
    coverImage: { type: [String] },
    rating: { type: Number },
    // foods: [
    //   {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "food",
    //   },
    // ],
  },
  {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
            delete ret.salt;
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },
    timestamps: true,
  }
);

const Vendor = mongoose.model<vendorDoc>("vendor", vendorSchema);

export { Vendor };
