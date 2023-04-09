import { Schema, model, ObjectId } from "mongoose";
import validator from "validator";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";
import bcrypt from "bcrypt";
import formatUserRes from "../services/formatUserRes.js";

const secretKey = process.env.JWT_KEY;
const expiresTime = process.env.expiresTime;

const userSchema = new Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    birth: {
      type: Date,
      required: true,
      validate: {
        validator: (value) => {
          const age = dayjs().diff(value, "year", true);
          return age >= 18 && age <= 55;
        },
        message: "User age must be between 18 and 55",
      },
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: "Invalid Email address",
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
            returnScore: false,
          }),
        message:
          "Password length must be longer than 8, have 1 uppercase, 1 lowercase and 1 number",
      },
    },
    device_list: [
      { 
        device_id: { 
          type: Schema.Types.ObjectId, 
          required: true 
        } 
      }
    ],
    access_tokens: [
      {
        access_tokens: {
          type: String,
          required: true,
        },
      },
    ],
    refresh_tokens: [
      {
        refresh_tokens: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    collection: "User",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
userSchema.methods.createAccessToken = async function () {
  const User = this;
  const access_tokens = jwt.sign({ userId: User._id }, secretKey, {
    expiresIn: expiresTime,
  });
  User.access_tokens = User.access_tokens.concat({ access_tokens });
  console.log(User.access_tokens);
  await User.save();
  return access_tokens;
};

userSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password"))
    User.password = await bcrypt.hash(User.password, 10);
  next();
});

userSchema.methods.createRes = async function () {
  const User = this;
  return formatUserRes(User);
};
const UserModel = model("User", userSchema);
export default UserModel;
