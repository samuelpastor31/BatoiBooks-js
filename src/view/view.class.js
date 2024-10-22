export default class View {
  constructor() {
    this.bookList = document.getElementById("list");
    this.bookForm = document.getElementById("bookForm");
    this.remove = document.getElementById("remove");
    this.about = document.getElementById("about");
    this.form = document.getElementById("form");
    this.messages = document.getElementById("messages");
  }

  renderModulesOptions(modules) {
    modules.forEach((module) => {
      const option = document.createElement("option");
      option.setAttribute("value", module.code);
      option.innerHTML = module.code+" - "+module.cliteral;

      const select = document.getElementById("id-module");
      select.appendChild(option);
    });
  }

  renderBook(book) {
    const ventaOVendido = (book.soldDate) ? 'Vendido el '+book.soldDate : 'En venta';
    const div = document.createElement("div");
    div.innerHTML = `<div class="Libro">
                    <h3>Libro: (${book.id})</h3>
                    <h4>Editorial ${book.publisher}</h4>
                    <p>${book.pages} páginas</p>
                    <p>Modulo: ${book.moduleCode}</p>
                    <p>Estado: ${book.status}</p>
                    <p>${ventaOVendido} </p>
                    <p>${book.comments}</p>
                    <h4>${book.price} €</h4>
                    </div>`;
    this.bookList.append(div);
  }

  removeBook(bookId) {
    const book = document.getElementById(bookId);
    book.remove();
  }

  renderMessage(message, isInfo) {
    const li = document.createElement("div");
  
    // Definimos los estilos en línea para cada tipo de alerta.
    const alertStyle = isInfo
      ? "background-color: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; padding: 10px; margin: 10px 0; border-radius: 5px;"
      : "background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; padding: 10px; margin: 10px 0; border-radius: 5px;";
  
    li.innerHTML = `
      <div style="${alertStyle}" role="alert">
        ${message}
        <button type="button" style="float: right; background: none; border: none; font-weight: bold; font-size: 16px; cursor: pointer;" onclick="this.parentElement.remove()">
          x
        </button>
      </div>`;
  
    this.messages.append(li);
  }
  
  
  
  setBookSubmitHandler(callback) {
    this.bookForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // a continuación recoge los datos del formulario y los guarda en un objeto // por último llama a la función recibida pasándole dicho objeto
      const moduleCode = document.getElementById("id-module").value;
      const publisher = document.getElementById("publisher").value;
      const price = document.getElementById("price").value;
      const pages = document.getElementById("pages").value;
      const status = document.getElementById("status").value;
      const comments = document.getElementById("comments").value;
      const book = { moduleCode,publisher, price, pages, status, comments };
      callback(book);
    });
  }

  setBookRemoveHandler(callback) {
    this.remove.addEventListener("click", () => {
      // recoge la id del libro a borrar y la pasa a la fn
      const idLibro = document.getElementById("id-remove").value;
      const idToRemove = parseInt(idLibro);
      callback(idToRemove);
    });
  }
}
