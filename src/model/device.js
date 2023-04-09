import { Schema, model } from "mongoose";
import validator from "validator";
import dayjs from "dayjs";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";
import bcrypt from "bcrypt";

const secretKey = process.env.JWT_KEY;
const expiresTime = process.env.expiresTime;

const deviceSchema = new Schema(
  {
    battery: {
      type: Number,
      default: 0,
    },
    brightness: {
      type: Number,
      default: 0,
    },
    coordinates: {
      latitude: {
        type: Number,
        default: 0,
      },
      longitude: {
        type: Number,
        default: 0,
      },
    },
    humi: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      default: "",
    },
    optic: {
      type: Number,
      default: 0,
    },
    temp: {
      type: Number,
      default: 0,
    },
    rain: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
    grid_status: {
      type: Boolean,
      default: false,
    },
    time_end: {
      type: Date,
      default: 0,
    },
    time_start: {
      type: Date,
      default: 0,
    },
    time_send: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "Device",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const DeviceModal = model('Device', deviceSchema);
export default DeviceModal;