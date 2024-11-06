export default class View {
  constructor() {
    this.bookList = document.getElementById("list");
    this.bookForm = document.getElementById("bookForm");
    this.remove = document.getElementById("remove");
    this.about = document.getElementById("about");
    this.form = document.getElementById("form");
    this.messages = document.getElementById("messages");
    this.title = document.getElementById("titleForm");
    this.divId = document.getElementById("divId");
    this.moduleInput = document.getElementById("id-module");

    // Limpia el mensaje de error personalizado cuando cambia el módulo
  this.moduleInput.addEventListener("change", () => {
    this.moduleInput.setCustomValidity("");
    const spanError = document.querySelector(".errorModule");
    if (spanError) {
      spanError.innerHTML = "";
    }
  });
  }


  renderModulesOptions(modules) {
    modules.forEach((module) => {
      const option = document.createElement("option");
      option.setAttribute("value", module.code);
      option.innerHTML = module.cliteral;

      const select = document.getElementById("id-module");
      select.appendChild(option);
    });
  }

  renderBook(book, module) {
    const ventaOVendido = book.soldDate
      ? "Vendido el " + book.soldDate
      : "En venta";
    const div = document.createElement("div");
    div.className = "card";
    div.id = book.id;

    div.innerHTML = `<h3 class="title">Libro: (${book.id})</h3>
                    <span class="material-icons">face</span>
                    <h4 class="publisher">Editorial ${book.publisher}</h4>
                    <p class="pages">${book.pages} páginas</p>
                    <p class="vliteral">Modulo: ${module.vliteral}</p>
                    <p class="status">Estado: ${book.status}</p>
                    <p>${ventaOVendido} </p>
                    <p class="comments">${book.comments}</p>
                    <h4 class="price">${book.price} €</h4>
                    <div id="buttons">
                    <button class="addToCartButton" data-id=${book.id}>
                      <span class="material-icons">add_shopping_cart</span>
                    </button>
                    <button class="editButton" data-id=${book.id} on>
                      <span class="material-icons">edit</span>
                    </button>
                    <button class="removeButton" data-id=${book.id}>
                      <span class="material-icons">delete</span>
                    </button>
                    </div>`;
    this.bookList.append(div);
    return div;
  }

  removeBook(bookId) {
    const book = document.getElementById(bookId);
    book.remove();
  }

  renderMessage(isInfo, message) {
    const li = document.createElement("div");

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

    if (isInfo) {
      setTimeout(() => {
        li.remove();
      }, 3000); // 3 segundos
    }
  }

  setBookSubmitHandler(callback) {
    this.bookForm.addEventListener("submit", (event) => {
      event.preventDefault();

      // a continuación recoge los datos del formulario y los guarda en un objeto // por último llama a la función recibida pasándole dicho objeto
      const id = document.getElementById("id")?.value ?? null;
      const moduleCode = document.getElementById("id-module")?.value ?? null;
      const publisher = document.getElementById("publisher")?.value ?? null;
      const price = document.getElementById("price")?.value ?? null;
      const pages = document.getElementById("pages")?.value ?? null;
      const status =
        document.querySelector('input[name="status"]:checked')?.value ?? null;
      const comments = document.getElementById("comments")?.value ?? null;
      const userId = 2; //TEMPORALMENTE HASTA HACER LOGIN

      // Limpiar mensajes de error anteriores para que no se acumulen
      const errorMessages = document.querySelectorAll(
        ".error, .errorModule, .errorStatus"
      );
      errorMessages.forEach((span) => (span.innerHTML = ""));

      let isValid = true;

      //revisar module no funciona
      const idModuleInput = document.getElementById("id-module");
      if ( idModuleInput.value === "- Selecciona un módulo -" ) {
        const spanError = document.querySelector(".errorModule");
        spanError.innerHTML = "El módulo es obligatorio";
        isValid = false;
      }

      const publisherInput = document.getElementById("publisher");
      if (!publisherInput.checkValidity()) {
        const spanError = publisherInput.nextElementSibling;
        spanError.innerHTML = "La editorial es obligatoria";
        isValid = false;
      }

      const priceInput = document.getElementById("price");
      if (!priceInput.checkValidity()) {
        const spanError = priceInput.nextElementSibling;
        if (priceInput.validity.valueMissing) {
          spanError.innerHTML = "El precio es obligatorio";
        } else if (priceInput.validity.rangeUnderflow) {
          spanError.innerHTML = "El precio no puede ser negativo";
        } else {
          spanError.innerHTML =
            "El precio debe tener formato numérico, con céntimos opcionales";
        }
        isValid = false;
      }

      const pagesInput = document.getElementById("pages");
      if (!pagesInput.checkValidity()) {
        const spanError = pagesInput.nextElementSibling;
        if (pagesInput.validity.valueMissing) {
          spanError.innerHTML = "El número de páginas es obligatorio";
        } else if (pagesInput.validity.rangeUnderflow) {
          spanError.innerHTML = "Las páginas no pueden ser negativas";
        } else {
          spanError.innerHTML = "Debe introducir un número entero";
        }
        isValid = false;
      }

      const statusInput = document.querySelector(
        'input[name="status"]:checked'
      );
      if (!statusInput) {
        const spanError = document.getElementsByClassName("errorStatus")[0];
        spanError.innerHTML = "El estado es obligatorio";
        isValid = false;
      }

      // Si todos los campos son válidos, ejecutar el callback con los datos del libro
      if (isValid) {
        const book = {
          userId: userId,
          moduleCode: idModuleInput.value,
          publisher: publisherInput.value,
          price: parseFloat(priceInput.value),
          pages: pagesInput.value,
          status: statusInput.value,
          comments: document.getElementById("comments").value,
        };

        // Meter el id si existe
        const id = document.getElementById("id").value;
        if (id) {
          book.id = id;
        }

        callback(book);
      }
    });
  }

  modifyView(book, module) {
    this.title.innerHTML = "Editar libro";
    this.divId.removeAttribute("hidden");
    const id = (this.bookForm.querySelector("#id").value = book.id);
    this.bookForm.querySelector("#btnAdd").textContent = "Cambiar";
    this.bookForm.querySelector("#publisher").value = book.publisher;
    this.bookForm.querySelector("#price").value = book.price;
    this.bookForm.querySelector("#pages").value = book.pages;
    this.bookForm.querySelector("#comments").value = book.comments;
    this.bookForm.querySelector("#id-module").value = module.code;
    const statusRadios = this.bookForm.querySelectorAll('input[name="status"]');
    statusRadios.forEach((radio) => {
      radio.checked = radio.value == book.status;
    });
  }

  resetView() {
    const enlace = document.getElementById("add");
    enlace.addEventListener("click", () => {
      this.title.innerHTML = "Añadir libro";
      this.bookForm.querySelector("#btnAdd").textContent = "Añadir";
      this.divId.setAttribute("hidden", true);
      this.bookForm.reset();
    });
    this.title.innerHTML = "Añadir libro";
    this.bookForm.querySelector("#btnAdd").textContent = "Añadir";
    this.divId.setAttribute("hidden", true);
    this.bookForm.reset();
  }

  // setBookRemoveHandler(callback) {
  //   this.remove.addEventListener("click", () => {
  //     // recoge la id del libro a borrar y la pasa a la fn
  //     const idLibro = document.getElementById("id-remove").value;
  //     const idToRemove = parseInt(idLibro);
  //     callback(idToRemove);
  //   });
  // }
}
