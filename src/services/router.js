export default class Router {
    constructor() {
      this.routes = {
        "#list": document.getElementById("list"),
        "#form": document.getElementById("bookForm"),
        "#about": document.getElementById("aboutFooter"),
      };
      this.init();
    }
  
    init() {
      window.addEventListener("hashchange", () => this.updateView());
      this.updateView();
    }
  
    updateView() {
        //si es la primera vez que entras no hay hash por lo tanto se inicia en #list
      const hash = window.location.hash || "#list";
      
      //añadimos la clase hidden a todas las secciones (En el styles.css hay un .hidden display none por lo que se ponen invisibles)
      Object.values(this.routes).forEach(section => section.classList.add("hidden"));
      
      //quitamos la clase hidden de la seccion correspondiente
      if (this.routes[hash]) {
        this.routes[hash].classList.remove("hidden");
      }
    }
  }

