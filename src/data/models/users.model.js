import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String },
    date: { type: Date },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    avatar: { type: String, default: "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg" },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN", "PREM"], index: true },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;
