import { Schema, model } from "mongoose";
import {} from "dotenv/config";
import createTimeType from "./timeType.js";

const imageSchema = new Schema(
  {
    url: { type: String, required: true },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);
const oldDataSchema = new Schema(
  {
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
    grid_status: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: "",
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const deviceSchema = new Schema(
  {
    battery: {
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
    name: {
      type: String,
      required: true,
      default: "Insect catch",
    },
    humi: {
      type: Number,
      default: 0,
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
    grid_status: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: "",
    },
    status: {
      type: Boolean,
      default: false,
    },
    led_color: {
      type: String,
      default: "#ffffff",
    },
    brightness: {
      type: Number,
      default: 0,
    },
    old_data: [oldDataSchema],
    time_end: createTimeType(21, 0),
    time_start: createTimeType(17, 0),
    time_send: createTimeType(0, 15),
    user: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "User",
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
      default: "12345678",
    },
    images_list: [imageSchema],
  },
  {
    collection: "Device",
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);
const DeviceModel = model("Device", deviceSchema);
export default DeviceModel;
