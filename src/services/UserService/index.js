import formatUserRes from "./formatUserRes.js";

class UserService {
  /**
   * @description Create an instance of UserService
   */
  constructor(User) {
    this.User = User;
  }

  /**
   * @description Create access token and refresh token then save to database
   * create token
   * @returns {{access_token: "", refresh_token: ""}}
   */
  async createToken() {
    
  }
  /**
   * @description Return user data expect uster device list
   * @returns {{
   *     "id": ObjectId,
   *     "email": String,
   *     "first_name": String,
   *     "last_name": String,
   *     "created_at": Date,
   *     "updated_at": Date,
   *     "birth": Date
   *   }}
   */
  async getUser() {
    return await formatUserRes(this.User);
  }
}
export default UserService;
