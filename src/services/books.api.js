import { getDBModule } from "./modules.api";
import { getDBUser } from "./users.api";

const SERVER = import.meta.env.VITE_URL_API;

    async function getDBBooks(){
        const response = await fetch(SERVER + '/books')
        if(!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const data = await response.json();
        return data;
    }

    async function getDBBook(id){
        const response = await fetch(SERVER + '/books/'+id)
        if(!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const data = await response.json();
        return data;
    }

    async function addBook(book){
        const response = await fetch(SERVER + '/books', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...book
            })
        })
        if(!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const data = await response.json();
        return data;
    }

    async function removeDBBook(id) {
        const response = await fetch(SERVER + '/books/'+id, {
            method: 'DELETE'
        })
        if(!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const data = await response.json();
        return data;
    }

    async function changeDBBook(book){
        const response = await fetch(SERVER + '/books/'+book.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...book
            })
        })
        if(!response.ok) {
            throw `Error ${response.status} de la BBDD: ${response.statusText}`
        }
        const data = await response.json();
        return data;
    }
    
    //prohibir  que un usuario pueda añadir mas de un libro del mismo modulo
    //
    async function checkBookInModuleDBBook(userId,moduleCode){

        const reponse = await fetch(SERVER + '/books?userId='+userId+'&moduleCode='+moduleCode)
        if(!reponse.ok) {
            throw `Error ${reponse.status} de la BBDD: ${reponse.statusText}`
        }
        const allBooks = await reponse.json();

        if (allBooks.length > 0){
            return true;
        }
        return false;

        // const allBooks = await getDBBooks();
        // allBooks.forEach(bookDB => {
        //     if (bookDB.moduleCode == book.moduleCode){
        //         if (bookDB.userId == book.userId){
        //             return true;
        //         }
        //         return false;
        //     }
        //     return false;
        // });
        
    }

    export {getDBBooks, getDBBook, addBook, removeDBBook, changeDBBook, checkBookInModuleDBBook}