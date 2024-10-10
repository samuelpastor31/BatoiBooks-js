import Books from "./src/model/books.class";

const booksCargado = new Books();
await booksCargado.populate();

// 1. Mostrar todos los libros del módulo 5021
const booksInModule5021 = booksCargado.booksFromModule('5021');
console.log('Todos los libros del módulo 5021:', booksInModule5021);

// 2. Mostrar los libros que están en estado "new"
const newBooksInModule5021 = booksCargado.booksWithStatus( 'new');
console.log('Libros del módulo 5021 en estado "new":', newBooksInModule5021);

// // 3. Incrementar un 10% el precio de todos los libros y mostrarlos
// const increasedPricesBooks2 = booksCargado.incrementPriceOfbooks(0.10);
// console.log('Libros con precio incrementado en un 10%:', increasedPricesBooks2);


