export default class Book {
    constructor(book) {
        this.id = book.id;
        this.userId = book.userId;
        this.moduleCode = book.moduleCode;
        this.publisher = book.publisher;
        this.price = book.price;
        this.pages = book.pages;
        this.status = book.status;
        this.photo = book.photo || "";
        this.comments = book.comments || "";
        this.soldDate = book.soldDate || "";
    }

    toString() {
        return `ID: ${this.id}
        User ID: ${this.userId}
        Module Code: ${this.moduleCode}
        Publisher: ${this.publisher}
        Prices: ${this.price}
        Pages: ${this.pages}
        Status: ${this.status}
        Photo: ${this.photo}
        Comments: ${this.comments}
        Sold Date: ${this.soldDate}`;
    }
}
