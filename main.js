import "./src/view/styles.css";
import batoiLogo from "/logoBatoi.png";
import Controller from "./src/controller/controller.class";

document.querySelector("#app").innerHTML = `
  <header>
    <img src="${batoiLogo}" alt="Logo Batoi" />
    <h1>BatoiBooks</h1>
    <h3>Control de libros</h3>
    <nav>
      <ul>
        <li><a href="#list">Ver Libros</a></li>
        <li><a href="#form">Añadir Libro</a></li>
        <li><a href="#about">Acerca de...</a></li>
        <li><a href="#messages"></a></li>
      </ul>
    </nav>
    <div id="list"></div>
    <div id="form"></div>
    <div id="about"></div>
    <div id="messages"></div>
  </header>
    <form id="bookForm">
      <h2 id="titleForm">Añadir libro</h3>
      <div id="divId" hidden>
        <label for="id">ID:</label>
        <input type="text" id="id" disabled>
      </div>
      <div>
        <label for="id-module">Módulo:</label>
        <select id="id-module" required>
          <option>- Selecciona un módulo -</option>
        </select>
        <span class="error"></span>
      </div>

      <div>
        <label for="publisher">Editorial:</label>
        <input type="text" id="publisher" required>
      </div>

      <div>
        <label for="price">Precio:</label>
        <input type="number" id="price" required min="0">
      </div>

      <div>
        <label for="pages">Páginas:</label>
        <input type="number" id="pages" required min="0">
      </div>

      <div>
        <label>Estado:</label>
        <input type="radio" name="status" value="good" required>
        <label for="good">Bueno</label>
        <input type="radio" name="status" value="bad" required>
        <label for="bad">Malo</label>
        <input type="radio" name="status" value="new" required>
        <label for="new">Nuevo</label>
      </div>

      <div>
        <label for="comments">Comentarios:</label>
        <textarea id="comments"></textarea>
      </div>

      <button id = "btnAdd" type="submit">Añadir</button>
      <button type="reset">Reset</button>
    </form>
    <footer>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos doloremque dolores!
    </footer>
  </header>
`;
document.addEventListener("DOMContentLoaded", () => {
  const myController = new Controller();
  myController.init();
});
