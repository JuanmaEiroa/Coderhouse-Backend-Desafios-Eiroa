import { userService } from "../repositories/repoIndex.js";

class UserController {
  constructor() {
    this.service = userService;
  }

  async get() {
    return await this.service.get();
  }

  async getByEmail(email) {
    return await this.service.getByEmail(email);
  }

  async getById(id) {
    return await this.service.getById(id);
  }

  async add(userData) {
    return await this.service.add(userData);
  }

  async changeRole(uid) {
    const user = await this.service.getById(uid);
    if (user.role === "User") {
      user.role = "Premium";
    } else if (user.role === "Premium") {
      user.role = "User";
    }
    await this.service.update(uid, user);
    return user;
  }
}

const userController = new UserController();
export default userController;
