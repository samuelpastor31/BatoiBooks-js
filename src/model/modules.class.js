import Module from "./module.class";
import { getDBModules } from "../services/modules.api";

export default class Modules {
  constructor() {
    this.data = [];
  }

  async populate() {
    const modules = await getDBModules();
    modules.forEach(module => {
        let moduleNuevo = new Module(
            module.code,
            module.cliteral,
            module.vliteral,
            module.courseId
          );
          this.data.push(moduleNuevo);
    });
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
