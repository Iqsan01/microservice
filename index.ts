import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { MONGO_URI } from "./config";
import { adminRoute, vendorRoute } from "./routes";
import path from "path";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/admin", adminRoute);
app.use("/vendor", vendorRoute);

mongoose.connect(MONGO_URI)
.then(() => {
    console.log('DB Connected');
}).catch(err => console.log('error', err));

app.listen(3001, () => {
  console.log("App listening on port 3001");
});
