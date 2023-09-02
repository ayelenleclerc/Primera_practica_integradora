import mongoose from "mongoose";

const URI =
  "mongodb+srv://Ayelenleclerc:yuskia13@backend.xrrgkdz.mongodb.net/ecommerce?retryWrites=true&w=majority";
await mongoose.connect(URI, {
  serverSelectionTimeoutMS: 5000,
});
console.log("Base de datos conectada....");
