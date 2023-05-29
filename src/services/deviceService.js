import DeviceModel from "../model/device.js";
import { publishMessage } from "./mqtt.js";

class DeviceService {
  /**
   * Create an instance of class DeviceService.
   * @param {DeviceModel} Device - The Device model.
   */
  constructor(Device) {
    this.Device = Device;
  }
  async sendMessage(message) {
    publishMessage(`device/${this.Device.device_id}`, JSON.stringify(message));
    return true;
  }
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
}
export default DeviceService;
