export default class User {
    constructor(id, nick, email, password) {
        this.id = id;
        this.nick = nick;
        this.email = email;
        this.password = password;
    }

    toString() {
        return `ID: ${this.id}
        Nick: ${this.nick}
        Email: ${this.email}
        Password: ${this.password}`;
    }
}
