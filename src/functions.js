'use strict'

//object: recibe el array de libros y una id y devuelve el libro con dicha id. SI no existe lanzará una excepción
function getBookById(books, bookId) {
    const bookBuscado = books.find(book => book.id === bookId);
    if (bookBuscado == undefined){
        throw new Error("No existe book con el id "+bookId);
    }
    return bookBuscado;
}

//number: igual pero devuelve la posición del libro dentro del array. SI no existe lanzará una excepción
function getBookIndexById(books, bookId) {
    const bookBuscado = books.findIndex(book => book.id === bookId);
    if (bookBuscado){
        throw new Error("No existe book con el id "+bookId);
    }
    return bookBuscado;
}

//: boolean: recibe el array de libros, la id del usuario y el código del módulo y nos dice si ese usuario ya tiene un libro con ese código
function bookExists(books, userId, moduleCode) {

    const bookUsuario = books.find(book => book.userId === userId && book.moduleCode === moduleCode);

    if (bookUsuario === undefined){
        return false;
    }else{
        return true;
    }
}

//array: recibe el array de libros y la id de un usuario y devuelve el array con todos los libros de dicho usuario
function booksFromUser(books, userId) {
    const librosUsuario = books.filter(book => book.userId === userId); 

    return librosUsuario;
}

//array: recibe el array de libros y el código de un módulo y devuelve el array con todos los libros de dicho módulo
function booksFromModule(books, moduleCode) {
    const librosModulo = books.filter(book => book.moduleCode === moduleCode); 

    return librosModulo;
}

//array: recibe el array de libros y un valor y devuelve el array con todos los libros cuyo precio es inferior o igual al valor pasado
function booksCheeperThan(books, price) {
    const librosPrecio = books.filter(book => book.price <= price); 

    return librosPrecio;
}

//array: recibe el array de libros y un estado ("new", "good", ...) y devuelve el array con todos los libros de dicho estado
function booksWithStatus(books, status) {
    const librosEstado = books.filter(book => book.status === status); 

    return librosEstado;
}

//string: recibe el array de libros y devuelve el precio medio de los mismos, con 2 decimales y el símbolo del € (ej.: "23.40 €")
function averagePriceOfBooks(books) {
    const totalPrecioLibros = books.reduce((total,libro) => total += libro.price,0);
    const totalPrecioAvg = totalPrecioLibros/books.length;
    if (books.length === 0){
        return  "0.00 €";
    }
    return totalPrecioAvg.toFixed(2) +' €';
}

//array: recibe el array de libros y devuelve un array con todos los que son apuntes
function booksOfTypeNotes(books) {
    const librosEstado = books.filter(book => book.publisher === "Apunts"); 

    return librosEstado;
}

//array: recibe el array de libros y devuelve un array con todos los que NO se han vendido aún
function booksNotSold(books) {
    const librosEstado = books.filter(book => book.soldDate == ""); 

    return librosEstado;
}

//array: recibe el array de libros y el porcentaje a incrementar (ej. 0,1 == 10%) y 
//devuelve un array igual pero con el precio incrementado en el porcentaje pasado
function incrementPriceOfbooks(books, percentage) {
    
    return Array.from(books).map(book => ({...book, price : book.price + (book.price * percentage)}));  
}

//object: recibe el array de usuarios y una id y devuelve el usuario con dicha id. SI no existe lanzará una excepción
function getUserById(users, userId) {
    const user = users.find(user => user.id == userId);
    if (user == undefined){
        throw new Error("No existe book con el usuario "+userId);
    } 

    return user;
}

// number: igual pero devuelve la posición del usuario dentro del array. SI no existe lanzará una excepción
function getUserIndexById(users, userId) {
    const user = users.findIndex(user => user.id == userId);
    if (user == -1){
        throw new Error("No existe book con el usuario "+userId);
    } 

    return user;
}

//object: recibe el array de usuarios y un nombre de usuario (nick) y devuelve el usuario con dicho nick. SI no existe lanzará una excepción
function getUserByNickName(users, nick) {
    const user = users.find(user => user.nick == nick);
    if(user == undefined){
        throw new Error("No existe el usuario "+nick);
    }
    return user;
}

//object: recibe el array de módulos y un código y devuelve el módulo con dicho código (campo code). SI no existe lanzará una excepción
function getModuleByCode(modules, moduleCode) {
    const modulo = modules.find(modulo => modulo.code == moduleCode);
    if(modulo == undefined){
        throw new Error("No existe el modulo con el codigo "+moduleCode);
    }
    return modulo;
}

export {
    getBookById,
    getBookIndexById,
    bookExists,
    booksFromUser,
    booksFromModule,
    booksCheeperThan,
    booksWithStatus,
    averagePriceOfBooks,
    booksOfTypeNotes,
    booksNotSold,
    incrementPriceOfbooks,
    getUserById,
    getUserIndexById,
    getUserByNickName,
    getModuleByCode
  }
