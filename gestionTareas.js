const readline = require("readline-sync");

// Objeto que almacenará las tareas
const tareas = [];

async function mostrarMenu() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log("\n--- Bienvenido al Gestor de Tareas --- \n");
      console.log("1. Mostrar tareas pendientes");
      console.log("2. Mostrar tareas Completadas");
      console.log("3. Insertar tareas");
      console.log("4. Eliminar tareas");
      console.log("5. Completar tareas");
      console.log("0. Salir");
      console.log("--------------------------------");
      const opcion = readline.question("Seleccione la opcion: ");
      if (opcion) {
        resolve(opcion);
      } else {
        reject("no es una opcion valida");
      }
    }, 2000); // Se simula un retardo de 2 segundos
  });
}

function obtenerTareasPendientes() {
  return new Promise((resolve, reject) => {
    if (tareas) {
      resolve(tareas.filter((item) => !item.estado)); // Se resuelve la promesa con el diccionario de tareas
    } else {
      reject("No se pudieron obtener las tareas."); // Se rechaza la promesa en caso de error
    }
  });
}

// Función para mostrar todas las tareas completadas
function obtenerTareasCompletadas() {
  return new Promise((resolve, reject) => {
    if (tareas) {
      resolve(tareas.filter((item) => item.estado)); // Se resuelve la promesa con el diccionario de tareas
    } else {
      reject("No se pudieron obtener las tareas."); // Se rechaza la promesa en caso de error
    }
  });
}

// Función para agregar una tarea
function agregarTarea() {
  return new Promise((resolve, reject) => {
    const descripcion = readline.question(
      "Ingrese la descripcion de la tarea: "
    );
    if (descripcion) {
      resolve(descripcion);
    } else {
      reject("no se pudo agregar la tarea");
    }
  });
}

// Función para marcar una tarea como completada

function marcarTareaCompletada() {
  return new Promise((resolve, reject) => {
  let num = 1;
  let idTareas = [];
  const tareasPendientes = tareas.filter((item) => !item.estado);
  tareasPendientes.map((tarea) => {
    console.log(`${num}. ${tarea.descripcion}`);
    num++;
    idTareas.push(tarea.id);
  });

  const tareaEscogida = readline.question("¿cual tarea desea completar?  ");
    if(tareaEscogida){
      const idTareaEscogida = tareas.filter((item)=> item.id === idTareas[tareaEscogida-1])
      resolve(idTareaEscogida)
    }else{
      reject("No selecciono ninguna tarea")
    }
  });
}

function eliminarTarea() {
  return new Promise((resolve, reject) => {
    let num = 1;
    let idTareas = [];
    tareas.map((tarea) => {
      console.log(`${num}. ${tarea.descripcion}`);
      num++;
      idTareas.push(tarea.id);
    });

  const tareaEscogida = readline.question("¿cual tarea desea eliminar?  ");
    if(tareaEscogida){
      const idTareaEscogida = tareas.filter((item)=> item.id === idTareas[tareaEscogida-1])
      resolve(idTareaEscogida)
    }else{
      reject("No selecciono ninguna tarea")
    }
  });
}

module.exports = {
  agregarTarea,
  marcarTareaCompletada,
  obtenerTareasCompletadas,
  obtenerTareasPendientes,
  eliminarTarea,
  mostrarMenu,
  tareas,
};