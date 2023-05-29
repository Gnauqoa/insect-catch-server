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
}
export default DeviceService;
