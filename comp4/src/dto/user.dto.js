export default class UserDTO {
  constructor(user) {
    this.id = user._id.toString();
    this.first_name = user.first_name;
    this.last_name = user.last_name;
    this.email = user.email;
    this.age = user.age;
    this.role = user.role;
    this.img = user.img;
    this.cart = user.cart;
    this.documents = user.documents;
    this.last_connection = user.last_connection;
  }
}
