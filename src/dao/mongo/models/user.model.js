import mongoose from "mongoose";

const collection = "users";

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "user",
  },
  cart: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "carts",
  },
});

const userModel = mongoose.model(collection, schema);

export default userModel;
