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

    export {getDBBooks, getDBBook, addBook, removeDBBook, changeDBBook}