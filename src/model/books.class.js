import Book from "./book.class";

export default class Books {
  constructor() {
    this.data = [];
  }

  populate(books) {
    for (let index in books) {
      this.data.push(new Book(books[index]));
    }
  }

  addBook(libro) {
    const newBook = new Book(libro);
    if (this.data.length != 0) {
      const bookIdMaximo = this.data.reduce((max, book) =>
        book.id > max.id ? book : max
      );
      newBook.id = bookIdMaximo.id + 1;
    }
    this.data.push(newBook);
    return newBook;
  }

  removeBook(id) {
    const book = this.data.findIndex((book) => book.id == id);
    if (book === -1) {
      throw new Error("No existe el libro con id " + id);
    } else {
      this.data.splice(book, 1);
    }
  }

  changeBook(bookNuevo) {
    const book = this.data.findIndex((book) => book.id == bookNuevo.id);
    if (book === -1) {
      throw new Error("No existe el libro con id " + bookNuevo.id);
    } else {
      this.data.splice(book, 1, bookNuevo);
    }
    return bookNuevo;
  }

  toString() {
    return this.data.map((book) => book.toString()).join("\n");
  }

  getBookById( bookId) {
    const bookBuscado = this.data.find((book) => book.id === bookId);
    if (!bookBuscado) {
      throw new Error("No existe book con el id " + bookId);
    }
    return bookBuscado;
  }

  getBookIndexById( bookId) {
    const bookBuscado = this.data.findIndex((book) => book.id === bookId);
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
    const librosUsuario = this.data.filter((book) => book.userId === userId);

    return librosUsuario;
  }

  booksFromModule(moduleCode) {
    const librosModulo = this.data.filter((book) => book.moduleCode === moduleCode);

    return librosModulo;
  }

  booksCheeperThan(price) {
    const librosPrecio = this.data.filter((book) => book.price <= price);

    return librosPrecio;
  }

  booksWithStatus(status) {
    const librosEstado = this.data.filter((book) => book.status === status);

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
    const librosEstado = this.data.filter((book) => book.publisher === "Apunts");
    return librosEstado;
  }

  booksNotSold() {
    const librosEstado = this.data.filter((book) => book.soldDate == "");

    return librosEstado;
  }

  incrementPriceOfbooks(percentage) {
    return Array.from(this.data).map((book) => ({
      ...book,
      price: book.price + book.price * percentage,
    }));
  }
}
