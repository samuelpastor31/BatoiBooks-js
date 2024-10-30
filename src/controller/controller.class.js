import Modules from "../model/modules.class";
import Users from "../model/users.class";
import Books from "../model/books.class";
import View from "../view/view.class";
import Book from "../model/book.class";
import Cart from "../model/cart.class";

export default class Controller {
  constructor() {
    this.model = {
      modules: new Modules(),
      users: new Users(),
      books: new Books(),
    };
    this.view = new View();
    this.cart = new Cart();
  }

  async init() {
    try {
      this.view.resetView();
      this.view.setBookSubmitHandler(this.handleSubmitBook.bind(this));
      //this.view.setBookRemoveHandler(this.handleRemoveBook.bind(this));
      await Promise.all([
        await this.model.modules.populate(),
        await this.model.users.populate(),
        await this.model.books.populate(),
        await this.cart.populate(),
      ]);

      this.view.renderModulesOptions(this.model.modules.data);

      this.model.books.data.forEach((element) => {
        const bookUI = this.view.renderBook(
          element,
          this.model.modules.getModuleByCode(element.moduleCode)
        );

        this.removeBookWithButton(bookUI, element);
        this.addBookToCartWithButton(bookUI, element);
        this.modifyBookWithButton(bookUI, element);
      });
    } catch (error) {
      this.view.renderMessage(false, error);
    }
  }

  async handleSubmitBook(payload) {
    try {
      if (document.getElementById("bookForm").querySelector("#btnAdd").textContent == "Cambiar") {

        alert("form enviado para modificar libro");
        const bookToModify = await this.model.books.getBookById(payload.id);

        bookToModify.moduleCode = payload.moduleCode;
        bookToModify.publisher = payload.publisher;
        bookToModify.price = payload.price;
        bookToModify.pages = payload.pages;
        bookToModify.status = payload.status;
        bookToModify.comments = payload.comments;

        await this.model.books.changeBook(bookToModify);

        const card = document.getElementById(bookToModify.id);
        if (card){
          card.querySelector(".publisher").textContent = bookToModify.publisher;
          card.querySelector(".price").textContent = bookToModify.price +" €";
          card.querySelector(".pages").textContent = bookToModify.pages;
          card.querySelector(".status").textContent = bookToModify.status;
          card.querySelector(".comments").textContent = bookToModify.comments;
          card.querySelector(".vliteral").textContent = this.model.modules.getModuleByCode(bookToModify.moduleCode).vliteral;
        }

        this.view.renderMessage(true, "Libro modificado");
        this.view.resetView();

      } else {

        alert("form enviado para añadir libro");
        console.log(payload);
        const newBook = await this.model.books.addBook(new Book(payload));

        const bookUI2 = this.view.renderBook(
          newBook,
          this.model.modules.getModuleByCode(newBook.moduleCode)
        );

        this.removeBookWithButton(bookUI2, newBook);
        this.addBookToCartWithButton(bookUI2, newBook);
        this.modifyBookWithButton(bookUI2, newBook);

        this.view.renderMessage(true, "Libro añadido");
      }
    } catch (error) {
      this.view.renderMessage(false, error);
    }
  }

  async handleRemoveBook(bookId) {
    try {
      console.log(bookId);
      await this.model.books
        .removeBook(bookId)
        .then(() => this.view.removeBook(bookId));
      this.view.renderMessage(true, "Libro borrado");
    } catch (error) {
      this.view.renderMessage(false, error);
    }
  }

  //Metodo para eliminar libros desde el boton del render book.
  removeBookWithButton(bookUI, book) {
    bookUI
      .getElementsByClassName("removeButton")[0]
      .addEventListener("click", () => {
        if (
          confirm(
            "Quieres borrar el libro con id " +
              book.id +
              " y modulo de " +
              this.model.modules.getModuleByCode(book.moduleCode).cliteral +
              "?"
          )
        ) {
          this.handleRemoveBook(
            bookUI.getElementsByClassName("removeButton")[0].dataset.id
          );
        } else {
          this.view.renderMessage(true, "Libro no borrado");
        }
      });
  }

  //Metodo para eliminar libros desde el boton del render book.
  addBookToCartWithButton(bookUI, book) {
    bookUI
      .getElementsByClassName("addToCartButton")[0]
      .addEventListener("click", () => {
        this.cart.addItem(book);
        this.view.renderMessage(true, "Libro añadido al carrito");
      });
  }

  modifyBookWithButton(bookUI, book) {
    bookUI
      .getElementsByClassName("editButton")[0]
      .addEventListener("click", () => {
        this.view.modifyView(
          book,
          this.model.modules.getModuleByCode(book.moduleCode)
        );
      });
  }
}
