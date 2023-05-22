import { Schema, model } from "mongoose";
import validator from "validator";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";
import bcrypt from "bcrypt";
import formatUserRes from "../services/formatUserRes.js";
import formatDeviceRes from "../services/formatDeviceRes.js";

const access_token_key = process.env.ACCESS_TOKEN_KEY;
const access_token_expires_time = process.env.ACCESS_TOKEN_EXPIRES_TIME;
const refresh_token_key = process.env.REFRESH_TOKEN_KEY;
const refresh_token_expires_time = process.env.REFRESH_TOKEN_EXPIRES_TIME;

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
          return age >= 18;
        },
        message: "User age must be older than 18",
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
          required: true,
          ref: "Device",
        },
      },
    ],
    tokens: [
      {
        access_token: {
          type: String,
          required: true,
        },
        refresh_token: {
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
userSchema.methods.createToken = async function () {
  const User = this;
  const access_token = jwt.sign({ userId: User._id }, access_token_key, {
    expiresIn: access_token_expires_time,
  });
  const refresh_token = jwt.sign({ userId: User._id }, refresh_token_key, {
    expiresIn: refresh_token_expires_time,
  });
  User.tokens = User.tokens.concat({ access_token, refresh_token });
  await User.save();
  return { access_token, refresh_token };
};

userSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password"))
    User.password = await bcrypt.hash(User.password, 10);
  next();
});

userSchema.methods.createRes = async function () {
  const User = this;
  await User.populate("device_list.device_id");
  User.device_list = User.device_list.map((ele) => formatDeviceRes(ele));
  return formatUserRes(User);
};
const UserModel = model("User", userSchema);
export default UserModel;
