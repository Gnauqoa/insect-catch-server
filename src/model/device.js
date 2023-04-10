import { Schema, model } from "mongoose";
import {} from "dotenv/config";
import formatDeviceRes from "../services/formatDeviceRes.js";
import formatDeviceControlRes from "../services/formatDeviceControlRes.js";
import createTimeType from "./timeType.js";


const deviceSchema = new Schema(
  {
    battery: {
      type: Number,
      default: 0,
    },
    led_color: {
      type: String,
      default: "#ffffff",
    },
    user: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User",
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
    time_end: createTimeType(21, 0),
    time_start: createTimeType(17, 0),
    time_send: createTimeType(0, 15),
    password: {
      type: String,
      required: true,
      minLength: 8,
      default: "12345678",
    },
  },
  {
    collection: "Device",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
deviceSchema.methods.createRes = async function () {
  const device = this;
  return formatDeviceRes(device);
};
deviceSchema.methods.createControlRes = async function () {
  const device = this;
  return formatDeviceControlRes(device);
};
const DeviceModel = model("Device", deviceSchema);
export default DeviceModel;
