import mongoose from "mongoose";

const collection = "messages";

const schema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

const chatModel = mongoose.model(collection, schema);

export default chatModel;
