import Module from "./module.class";

export default class Modules {
  constructor() {
    this.data = [];
  }

  populate(modules) {
    for (let index in modules) {
      const module = modules[index];
      let moduleNuevo = new Module(
        module.code,
        module.cliteral,
        module.vliteral,
        module.courseId
      );
      this.data.push(moduleNuevo);
    }
  }

  toString() {
    return this.data.map((module) => module.toString()).join("\n");
  }

  getModuleByCode(moduleCode) {
    const modulo = this.data.find((modulo) => modulo.code == moduleCode);
    if (modulo == undefined) {
      throw new Error("No existe el modulo con el codigo " + moduleCode);
    }
    return modulo;
  }
}
