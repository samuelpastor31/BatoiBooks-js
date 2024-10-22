import Modules from "../model/modules.class";
import Users from "../model/users.class";
import Books from "../model/books.class";
import View from "../view/view.class";
import Book from "../model/book.class";
import Module from "../model/module.class";

export default class Controller {
  constructor() {
    this.model = {
      modules: new Modules(),
      users: new Users(),
      books: new Books(),
    };
    this.view = new View();
  }

  async init() {
    try {
      this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
      this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
      await this.model.modules.populate();
      await this.model.users.populate();
      await this.model.books.populate();
      this.view.renderModulesOptions(this.model.modules.data);
      this.model.books.data.forEach((element) => {
        this.view.renderBook(element,this.model.modules.getModuleByCode(element.moduleCode));
      });
    } catch (error) {
      this.view.renderMessage(error,false);
    }
  }

  async handleSubmitBook(payload) {
    try {
      alert("form enviado");
      console.log(payload);
      const newBook = await this.model.books.addBook(new Book(payload));
      this.view.renderBook(newBook, this.model.modules.getModuleByCode(newBook.moduleCode));
      this.view.renderMessage("Libro añadido",true);
    } catch (error) {
      this.view.renderMessage(error,false);
    }
  }

  async handleRemoveBook(bookId) {
    try {
      alert("libro borrado");
      console.log(bookId);
      await this.model.books.removeBook(bookId)
        .then(() => this.view.removeBook(bookId));
      this.view.renderMessage("Libro borrado",true);
    } catch (error) {
      this.view.renderMessage(error,false);
    }
  }
}
