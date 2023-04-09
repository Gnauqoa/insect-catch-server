import { Schema, model } from "mongoose";
import {} from "dotenv/config";
import formatDeviceRes from "../services/formatDeviceRes.js";

const deviceSchema = new Schema(
  {
    battery: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      default: null,
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
const DeviceModel = model("Device", deviceSchema);
export default DeviceModel;
