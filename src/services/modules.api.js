const SERVER = import.meta.env.VITE_URL_API;

async function getDBModules() {
  const response = await fetch(SERVER + "/modules");
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

async function getDBModule(id) {
  const response = await fetch(SERVER + "/modules/" + id);
  if (!response.ok) {
    throw `Error ${response.status} de la BBDD: ${response.statusText}`;
  }
  const data = await response.json();
  return data;
}

export {
    getDBModules,
    getDBModule
}
