import User from "./user.class";
import { changeDBUserPassword, getDBUsers } from "../services/users.api";
import { addDBUser } from "../services/users.api";
import { changeDBUser } from "../services/users.api";
import { removeDBUser } from "../services/users.api";


export default class Users {
  constructor() {
    this.data = [];
  }

  async populate() {
    const users = await getDBUsers();
    users.forEach(user => {
        this.data.push(new User(user.id, user.nick, user.email, user.password));
    });
    }

  async addUser(user) {
    await addDBUser(user);
    const newUser = new User(user.id, user.nick, user.email, user.password);
    if (this.data.length === 0) {
      newUser.id = 1;
    }else if (this.data.length != 0) {
      const userIdMaximo = this.data.reduce((max, user) =>
        user.id > max.id ? user : max
      );
      newUser.id = userIdMaximo.id + 1;
    }
    this.data.push(newUser);
    return newUser;
  }

  async removeUser(id) {
    await removeDBUser(id);
    const user = this.getUserIndexById(id);
    this.data.splice(user, 1);
  }

  async changeUser(user) {
    const newUser = await changeDBUser(user);
    const index = this.getUserIndexById(newUser.id);
    const modifiedUser = new User(newUser.id, newUser.nick, newUser.email, newUser.password);
    this.data.splice(index, 1, modifiedUser);
    return modifiedUser;
  }

  toString() {
    return this.data.map((user) => user.toString()).join("\n");
  }

  getUserById(userId) {
    const user = this.data.find((user) => user.id == userId);
    if (user == undefined) {
      throw new Error("No existe book con el usuario " + userId);
    }

    return user;
  }

  getUserIndexById(userId) {
    const user = this.data.findIndex((user) => user.id == userId);
    if (user == -1) {
      throw new Error("No existe book con el usuario " + userId);
    }

    return user;
  }

  getUserByNickName(nick) {
    const user = this.data.find((user) => user.nick == nick);
    if (user == undefined) {
      throw new Error("No existe el usuario " + nick);
    }
    return user;
  }

  async changeUserPassword(id, contra){
    const newUser = await changeDBUserPassword(id,contra);
    const index = this.getUserIndexById(newUser.id);
    const modifiedUser = new User(newUser.id, newUser.nick, newUser.email, newUser.password);
    this.data.splice(index, 1, modifiedUser);
    return modifiedUser;
  }
}
