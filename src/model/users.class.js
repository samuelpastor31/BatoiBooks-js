import User from "./user.class";

export default class Users {
  constructor() {
    this.data = [];
  }

  populate(users) {
    users.forEach(user => {
        this.data.push(new User(user.id, user.nick, user.email, user.password));
    });
    }

  addUser(user) {
    const newUser = new User(user.id, user.nick, user.email, user.password);
    if (this.data.length != 0) {
      const userIdMaximo = this.data.reduce((max, user) =>
        user.id > max.id ? user : max
      );
      newUser.id = userIdMaximo.id + 1;
    }
    this.data.push(newUser);
    return newUser;
  }

  removeUser(id) {
    const user = this.data.findIndex((user) => user.id == id);
    if (user === -1) {
      throw new Error("No existe el user con id " + id);
    } else {
      this.data.splice(user, 1);
    }
  }

  changeUser(userNuevo) {
    const user = this.data.findIndex((user) => user.id == userNuevo.id);
    if (user === -1) {
      throw new Error("No existe el user con id " + userNuevo.id);
    } else {
      this.data.splice(user, 1, userNuevo);
    }
    return userNuevo;
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
}
