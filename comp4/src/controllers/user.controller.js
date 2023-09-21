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

  async update(uid, user) {
    return await this.service.update(uid, user);
  }

  async changeRole(uid) {
    const user = await this.service.getById(uid);
    const validatePremium = () => {
      const userDocs = user.documents.map((doc) => doc.name);
      const neededDocs = [
        "ID Document",
        "Address Document",
        "Account Document",
      ];
      if (neededDocs.every((doc) => userDocs.includes(doc))) {
        user.role = "Premium";
      } else {
        throw new Error("Se necesitan cargar los archivos necesarios");
      }
    };
    if (user.role === "User") {
      validatePremium();
    } else if (user.role === "Premium") {
      user.role = "User";
    }
    await this.service.update(uid, user);
    return user
  }
}

const userController = new UserController();
export default userController;
