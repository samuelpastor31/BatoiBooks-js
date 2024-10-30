import Book from "./book.class";
import View from "../view/view.class";

export default class Cart {
  constructor() {
    this.data = [];
    this.view = new View();
  }

  populate() {}

  getBookById(bookId) {
    return this.data.find((book) => book.id === bookId);
  }

  addItem(book) {
    if (this.getBookById(book.id) == null) {
      const bookAAñadir = new Book(book);
      this.data.push(bookAAñadir);
    } else {
        throw new Error(this.view.renderMessage(false,"El libro ya existe en el carrito"));
    }
  }

  removeItem(bookId) {
    if (this.getBookById(bookId) != null) {
      this.data = this.data.filter((book) => book.id !== bookId);
    }else{
        throw new Error(this.view.renderMessage(false,"El libro no existe en el carrito"));
    }
  }

  toString() {
    return this.data.map((book) => book.toString()).join("\n");
  }
}
