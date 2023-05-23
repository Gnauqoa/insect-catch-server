import UserModel from "../../model/user.js";
import formatUserRes from "./formatUserRes.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {} from "dotenv/config";
import dayjs from "dayjs";
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
  async createToken() {
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
    return await this.createToken();
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
    return await formatUserRes(this.User);
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
    return await formatUserRes(this.User);
  }
}
export default UserService;
