import Book from "./book.class";
import { getDBBooks } from "../services/books.api";
import { changeDBBook } from "../services/books.api";
import { addBook } from "../services/books.api";
import { removeDBBook } from "../services/books.api";
const NOTES = "Apunts";

export default class Books {
  constructor() {
    this.data = [];
  }

  async populate() {
    const books = await getDBBooks();
    books.forEach(book => {
      this.data.push(new Book(book));
    });
  }

  async addBook(libro) {
    const libroNuevo = await addBook(libro);
    const newBook = new Book(libroNuevo);
    this.data.push(newBook);
    return newBook;
  }

  async removeBook(id) {
    await removeDBBook(id);
    const book = this.getBookIndexById(id);
    this.data.splice(book, 1);
  }

  async changeBook(book) {
    const newBook = await changeDBBook(book);
    const index = this.getBookIndexById(newBook.id);
    const modifiedbook = new Book(newBook);
    this.data.splice(index, 1, modifiedbook);
    return modifiedbook;
  }

  toString() {
    return this.data.map((book) => book.toString()).join("\n");
  }

  getBookById( bookId) {
    const bookBuscado = this.data.find((book) => book.id == bookId);
    if (!bookBuscado) {
      throw new Error("No existe book con el id " + bookId);
    }
    return bookBuscado;
  }

  getBookIndexById( bookId) {
    const bookBuscado = this.data.findIndex((book) => book.id == bookId);
    if (bookBuscado === -1) {
      throw new Error("No existe book con el id " + bookId);
    }
    return bookBuscado;
  }

  bookExists(userId, moduleCode) {
    const bookUsuario = this.data.find(
      (book) => book.userId === userId && book.moduleCode === moduleCode
    );
    if (!bookUsuario) {
      return false;
    } else {
      return true;
    }
  }

  booksFromUser( userId) {
    const librosUsuario = this.data.filter((book) => book.userId == userId);

    return librosUsuario;
  }

  booksFromModule(moduleCode) {
    const librosModulo = this.data.filter((book) => book.moduleCode == moduleCode);

    return librosModulo;
  }

  booksCheeperThan(price) {
    const librosPrecio = this.data.filter((book) => book.price <= price);

    return librosPrecio;
  }

  booksWithStatus(status) {
    const librosEstado = this.data.filter((book) => book.status == status);

    return librosEstado;
  }

  averagePriceOfBooks() {
    const totalPrecioLibros = this.data.reduce(
      (total, libro) => (total += libro.price),
      0
    );
    const totalPrecioAvg = totalPrecioLibros / this.data.length;
    if (this.data.length === 0) {
      return "0.00 €";
    }
    return totalPrecioAvg.toFixed(2) + " €";
  }

  booksOfTypeNotes() {
    const librosEstado = this.data.filter((book) => book.publisher == NOTES);
    return librosEstado;
  }

  booksNotSold() {
    const librosEstado = this.data.filter((book) => book.soldDate == "");

    return librosEstado;
  }
}
