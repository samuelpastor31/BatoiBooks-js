import * as funciones from './src/functions.js';
import data from './src/services/datos.js';

// 1. Todos los libros del usuario con ID 4
const booksForUser4 = funciones.booksFromUser(data.books, 4);
console.log('Todos los libros del usuario 4:', booksForUser4);

// 2. Todos los libros del módulo "5021" que están en buen estado ("good")
const goodBooksInModule5021 = funciones.booksWithStatus(funciones.booksFromModule(data.books, '5021'), 'good');
console.log('Libros del módulo 5021 en buen estado:', goodBooksInModule5021);

// 3. Incrementar un 10% el precio de todos los libros
const increasedPricesBooks = funciones.incrementPriceOfbooks(data.books, 0.10);
console.log('Libros con precio incrementado en un 10%:', increasedPricesBooks);


