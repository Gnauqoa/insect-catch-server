import UserModel from "../model/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";
import dayjs from "dayjs";
import AddQueueModel from "../model/addQueue.js";
import DeviceModel from "../model/device.js";
import DeviceService from "./deviceService.js";

const access_token_key = process.env.ACCESS_TOKEN_KEY;
const access_token_expires_time = process.env.ACCESS_TOKEN_EXPIRES_TIME;
const refresh_token_key = process.env.REFRESH_TOKEN_KEY;
const refresh_token_expires_time = process.env.REFRESH_TOKEN_EXPIRES_TIME;

class UserService {
  /**
   * Create an instance of UserService.
   * @param {UserModel} User - The User model.
   */
  constructor(User) {
    this.User = User;
  }

  /**
   * Create access token and refresh token then save to database.
   * @returns {{ access_token: string, refresh_token: string }} - The generated access token and refresh token.
   */
  async createRefreshToken() {
    const access_token = jwt.sign({ userId: this.User._id }, access_token_key, {
      expiresIn: access_token_expires_time,
    });
    const refresh_token = jwt.sign(
      { userId: this.User._id },
      refresh_token_key,
      {
        expiresIn: refresh_token_expires_time,
      }
    );
    this.User.tokens = this.User.tokens.concat({ access_token, refresh_token });
    await this.User.save();
    return { access_token, refresh_token };
  }

  /**
   * Login with email and password.
   * If login is successful, return access token and refresh token. Otherwise, return null.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {{ access_token: string, refresh_token: string } | null} - The access token and refresh token if login is successful, otherwise null.
   */
  async login(email, password) {
    const user = await UserModel.findOne({ email });
    if (!user) return null;
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) return null;
    this.User = user;
    return await this.createRefreshToken();
  }

  /**
   * Register a new user.
   * @param {string} first_name - The user's first name.
   * @param {string} last_name - The user's last name.
   * @param {string} birth - The user's birth date.
   * @param {string} email - The user's email.
   * @param {string} password - The user's password.
   * @returns {{
   *     "id": ObjectId,
   *     "email": string,
   *     "first_name": string,
   *     "last_name": string,
   *     "created_at": Date,
   *     "updated_at": Date,
   *     "birth": Date
   *   } | null} - The registered user data if successful, otherwise null.
   */
  async register(first_name, last_name, birth, email, password) {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return null;
    const user = new UserModel({
      email,
      first_name,
      last_name,
      birth: dayjs(birth).toDate(),
      password: password || "12345678",
    });
    await user.save();
    this.User = user;
    return this.getUser();
  }
  async logout(indexToken) {
    this.User.tokens.splice(indexToken, 1);
    await this.User.save();
  }
  async logoutAll() {
    this.User.tokens = [];
    await this.User.save();
  }
  async requestAccessToken(refresh_token) {
    const decodedToken = jwt.verify(refresh_token, refresh_token_key);
    const user = await UserModel.findOne({
      _id: decodedToken.userId,
    });
    this.User = user;
    if (!this.User) return null;
    const indexToken = this.User.tokens.findIndex(
      (ele) => ele.refresh_token === refresh_token
    );
    if (indexToken === -1) return null;
    const access_token = await jwt.sign(
      { userId: decodedToken.userId },
      access_token_key,
      {
        expiresIn: access_token_expires_time,
      }
    );
    this.User.tokens[indexToken].access_token = access_token;
    await this.User.save();
    return access_token;
  }
  async addDevice(add_code) {
    const queue = await AddQueueModel.findOne({ add_code: add_code });
    if (!queue) return null;
    if (dayjs().isAfter(queue.expires_in)) return 400;
    await UserModel.findOneAndUpdate(
      { _id: this.User._id },
      {
        $push: {
          device_list: { device_id: queue.device_id },
        },
      }
    );
    const device = await DeviceModel.findById(queue.device_id);
    if (device.user) return 409;
    const new_device = await DeviceModel.findOneAndUpdate(
      {
        _id: queue.device_id,
      },
      { $set: { user: this.User._id } },
      { new: true }
    );
    await new DeviceService(new_device).sendMessage({
      status: 200,
      message: "Has been added",
      data: {
        user: { name: this.User.first_name + " " + this.User.last_name },
      },
    });
    return new_device;
  }
  async getDeviceList() {
    await this.User.populate("device_list.device_id");
    return await Promise.all(
      this.User.device_list.map(
        async (device) => await new DeviceService(device.device_id).getDevice()
      )
    );
  }
  /**
   * Verifies the access token and retrieves the corresponding user.
   * @param {string} access_token - The access token to be verified.
   * @returns {{
   *     user: UserModel,
   *     access_token: string,
   *     indexToken: number
   * } | null} - An object containing the user, the verified access token, and the index of the token in the user's tokens array. Returns null if the token is invalid or the user is not found.
   */
  async verifyToken(access_token) {
    const decodedToken = jwt.verify(access_token, access_token_key);
    const user = await UserModel.findOne({
      _id: decodedToken.userId,
    });
    if (!user) return null;
    const indexToken = user.tokens.findIndex(
      (ele) => ele.access_token === access_token
    );
    if (indexToken === -1) return null;
    return { user, access_token, indexToken };
  }
  async verifyDevice(device_id) {
    const device = await DeviceModel.findOne({
      _id: device_id,
      user: this.User._id,
    });
    if (device) return device;
    return 404;
  }
  /**
   * Return user data excluding the user's device list.
   * @returns {{
   *     "id": ObjectId,
   *     "email": string,
   *     "first_name": string,
   *     "last_name": string,
   *     "created_at": Date,
   *     "updated_at": Date,
   *     "birth": Date
   *   }} - The user data.
   */
  async getUser() {
    return {
      id: user._id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      created_at: user.created_at,
      updated_at: user.updated_at,
      birth: user.birth,
    };
  }
}
export default UserService;
