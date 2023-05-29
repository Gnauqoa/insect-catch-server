import cloudinary from "../config/cloudinary.js";
import DeviceModel from "../model/device.js";
import UserModel from "../model/user.js";
import { publishMessage } from "./mqtt.js";
import reverseGeocoding from "./locationIq.js";
import AddQueueModel from "../model/addQueue.js";
import dayjs from "dayjs";
import {} from "dotenv/config";

const adminCode = process.env.adminCode;

class DeviceService {
  /**
   * Create an instance of class DeviceService.
   * @param {DeviceModel} Device - The Device model.
   */
  constructor(Device) {
    this.Device = Device;
  }
  /**
   * Sends a message to the device.
   * @param {Object} message - The message to be sent.
   * @returns {Promise<boolean>} - A promise that resolves to true once the message is sent.
   */
  async sendMessage(message) {
    publishMessage(`device/${this.Device._id}`, JSON.stringify(message));
    return true;
  }
  /**
   * Retrieves the device data.
   * @returns {Promise<Object>} - A promise that resolves to an object containing the device data.
   */
  async getDevice() {
    const images_length = this.Device.images_list.length;
    return {
      id: this.Device._id,
      battery: this.Device.battery,
      brightness: this.Device.brightness,
      coordinates: this.Device.coordinates,
      humi: this.Device.humi,
      led_color: this.Device.led_color,
      location: this.Device.location,
      optic: this.Device.optic,
      temp: this.Device.temp,
      rain: this.Device.rain,
      status: this.Device.status,
      grid_status: this.Device.grid_status,
      time_end: this.Device.time_end,
      time_start: this.Device.time_start,
      time_send: this.Device.time_send,
      name: this.Device.name,
      updated_at: this.Device.updated_at,
      created_at: this.Device.created_at,
      image: images_length
        ? {
            url: this.Device.images_list[images_length - 1].url,
            created_at: this.Device.images_list[images_length - 1].created_at,
            updated_at: this.Device.images_list[images_length - 1].updated_at,
          }
        : null,
    };
  }
  /**
   * Updates the sensor data of the device.
   * @param {Object} sensor_data - The sensor data to be updated.
   * @returns {Promise<void>} - A promise that resolves once the sensor data is updated.
   */
  async updateSensorData(sensor_data) {
    const img_base64 = sensor_data.img;
    const loc = await cloudinary.uploader.upload(img_base64, {
      folder: `device/${this.Device._id}`,
    });
    this.Device.old_data.push({
      coordinates: this.Device.coordinates,
      humi: this.Device.humi,
      optic: this.Device.optic,
      temp: this.Device.temp,
      rain: this.Device.rain,
      grid_status: this.Device.grid_status,
      location: this.Device.location,
    });
    this.Device.images_list.push({ url: loc.url });
    this.Device.battery = sensor_data.battery;
    this.Device.coordinates = sensor_data.coordinates;
    this.Device.humi = sensor_data.humi;
    this.Device.optic = sensor_data.optic;
    this.Device.temp = sensor_data.temp;
    this.Device.rain = sensor_data.rain;
    this.Device.grid_status = sensor_data.grid_status;
    const location = await reverseGeocoding(this.Device.coordinates);
    this.Device.location = location.data.display_name;
    await this.Device.save();
    this.sendMessage({ status: 200, message: "update success!" });
  }
  /**
   * Updates the control data of the device.
   * @param {Object} control_data - The control data to be updated.
   * @returns {Promise<Object>} - A promise that resolves to an object containing the updated device data.
   */
  async updateControlData(control_data) {
    this.Device.brightness = control_data.brightness;
    this.Device.led_color = control_data.led_color;
    this.Device.time_end = control_data.time_end;
    this.Device.time_start = control_data.time_start;
    this.Device.time_send = control_data.time_send;
    this.Device.grid_status = control_data.grid_status;
    await this.Device.save();
    return await this.getDevice();
  }
  /**
   * Creates the control data for the device.
   * @returns {Promise<Object>} - A promise that resolves to an object containing the control data.
   */
  async createControlData() {
    return {
      brightness: this.Device.brightness,
      time_end: this.Device.time_end,
      time_start: this.Device.time_start,
      time_send: this.Device.time_send,
      led_color: this.Device.led_color,
    };
  }
  /**
   * Creates a new add device code for the device.
   * @returns {string} - Add code
   */
  async createAddDeviceCode() {
    if (this.Device.user)
      await UserModel.findOneAndUpdate(
        { _id: this.Device.user },
        { $pull: { device_list: { device_id: this.Device._id } } }
      );
    this.Device.user = null;
    await this.Device.save();
    await AddQueueModel.deleteMany({ device_id: this.Device._id });
    const newQueue = new AddQueueModel({
      device_id: this.Device._id,
      add_code: randomString(6),
      expires_in: dayjs().add("15", "minute").toDate(),
    });
    await newQueue.save();
    return newQueue.add_code;
  }
  /**
   * Creates a new device.
   * @param {string} admin_code - The admin code used to create the device.
   * @returns {Object | null} - A promise that resolves to an object containing the created device data if successful, or null if the admin code is incorrect.
   */
  async createDevice(admin_code) {
    if (adminCode !== admin_code) return null;
    const device = new DeviceModel({});
    await device.save();
    this.Device = device;
    return await this.getDevice();
  }
}

function randomString(length) {
  const alphabet =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; ++i) {
    result += alphabet[Math.floor(alphabet.length * Math.random())];
  }
  return result;
}

export default DeviceService;
