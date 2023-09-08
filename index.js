const readline = require('readline');

// Creamos la interfaz para leer la entrada del usuario
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Objeto que almacenará las tareas
const tareas = {};

// Función para mostrar el menú
function mostrarMenu() {
console.log(`\n--- Bienvenido a el menu de tareas --- \n
1. Mostrar tareas pendientes\n
2. Mostrar tareas Completadas\n
3. Insertar tareas \n
4. Eliminar tareas \n
5. Completar tareas \n
0. Salir \n 
---------------------------------
`);
rl.question('Seleccione una opción: ', (opcion) => {
    ejecutarOpcion(opcion);
  });
}

// Función para ejecutar la opción seleccionada por el usuario
function ejecutarOpcion(opcion) {
  switch (opcion) {
    case '1':
      mostrarTareasPendientes();
      break;
    case '2':
      mostrarTareasCompletas();
      break;
    case '3':
      agregarTarea();
      break;
    case '4':
      eliminarTarea();
      break;
    case '5':
      marcarTareaCompletada();
      break;
    case '0':
    
      rl.close();
      break;
    default:
      console.log('Opción inválida. ');
      mostrarMenu();
      break;
  }
}
function mostrarTareasPendientes() {
  console.log('\n--- Lista de Tareas incompletas---\n');

  if(Object.keys(tareas).length === 0){
    console.log("No hay tareas Pendientes");
    mostrarMenu();
  }else{
    for (let index in tareas){
      if(!tareas[index].completada)
        console.log(`ID: ${index}\nDescripción: ${tareas[index].descripcion} \n_________________`);
}
console.log('\n');

  mostrarMenu();
};
}

// Función para mostrar todas las tareas
function mostrarTareasCompletas() {
  console.log('\n--- tareas completadas  ---\n');
  if(Object.keys(tareas).length === 0){
    console.log("No hay tareas Completadas");
    mostrarMenu();
  }else{
    for (let index in tareas){
      if(tareas[index].completada)
        console.log(`ID: ${index}\nDescripción: ${tareas[index].descripcion} \n_________________`);
}  
  console.log('\n');
  mostrarMenu();
};
}


// Función para agregar una tarea
function agregarTarea() {
  rl.question('Ingrese la descripción de la tarea: ', (descripcion) => {
    const id = Math.random().toString().substring(2);
    tareas[id] = {
      descripcion: descripcion,
      completada: false
    };
    console.log(`Tarea agregada`);
    mostrarMenu();
  });
}

// Función para marcar una tarea como completada

function marcarTareaCompletada() {
  let num = 1;
  let tareasPendientes = [];
  if(Object.keys(tareas).length === 0){
    console.log("No hay tareas Pendientes");
    mostrarMenu();
  }else{
  for(let id in tareas){
    if(!tareas[id].completada){
    console.log(`${num}. ${tareas[id].descripcion}`)
    num++;
    tareasPendientes.push(id);
    }
  }
}
  rl.question('¿cual tarea desea completar?  ', (idtareas) => {
    let idTareaEscogida = tareasPendientes[idtareas-1];
    if (tareas[idTareaEscogida]) {
      tareas[idTareaEscogida].completada = true;
      console.log(`Tarea marcada como completada.`);
    } else {
      console.log('ID de tarea inválido.');
    }
     
   mostrarMenu();
  });
}

function eliminarTarea() {
  let num = 1;
  let allTareas= [];
  for(let id in tareas){
    console.log(`${num}. ${tareas[id].descripcion}`)
    num++;
    allTareas.push(id);
  }
  rl.question('¿cual tarea desea eliminar?  ', (idtareas) => {
    let idTareaEscogida = allTareas[idtareas-1];
    if(idtareas!=null){
    delete tareas[idTareaEscogida];
      console.log(`Tarea eliminada.`);
    } else {
      console.log('ID de tarea inválido.');
    }
     
   mostrarMenu();
  });
}

// Iniciamos el programa mostrando el menú
mostrarMenu();