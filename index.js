const {
    agregarTarea,
    marcarTareaCompletada,
    obtenerTareasCompletadas,
    eliminarTarea,
    mostrarMenu,
    obtenerTareasPendientes,
    tareas,
  } = require("./gestionTareas");
  
  // Función para mostrar el menú
  const main = async () => {
    let opcion;
    do {
      opcion = await mostrarMenu();
      switch (opcion) {
        case "1":
          console.log("**** Tareas Pendientes ****");
          obtenerTareasPendientes()
            .then((tarea) =>
              tarea.map((listaTareas) => {
                console.log(
                  `\nID: ${listaTareas.id}\nDescripción: ${listaTareas.descripcion}\n_________________`
                );
              })
            )
            .catch((error) => {
              console.error("Error al obtener las tareas:", error);
            });
          break;
        case "2":
          console.log("**** Tareas Completadas ****");
          const tarea = await obtenerTareasCompletadas();
          try {
            tarea.map((listaTareas) => {
              console.log(
                `\nID: ${listaTareas.id}\nDescripción: ${listaTareas.descripcion}\n_________________`
              );
            });
          } catch (error) {
            console.error("Error al obtener las tareas:", error);
          }
          break;
        case "3":
          const newId = Math.random().toString().substring(2);
          agregarTarea()
            .then((descripcion) => {
              tareas.push({
                id: newId,
                descripcion,
                estado: false,
              });
              console.error("se agregó la tarea exitosamente");
            })
            .catch((error) => {
              console.error("No se pudo agregar la tarea", error);
            });
          break;
        case "4":
          try {
            const tarea = await eliminarTarea();
            const indiceTarea = tareas.findIndex(
              (item) => item.id === tarea[0].id
            );
            if (indiceTarea !== -1) {
              tareas.splice(indiceTarea, 1);
              console.log("Tarea eliminada con éxito");
            }
          } catch (error) {
            console.error("Error al obtener las tareas:", error);
          }
          break;
        case "5":
          marcarTareaCompletada()
            .then((tarea) => {
              tarea[0].estado = true;
              console.log("Tarea completada");
            })
            .catch((error) => {
              console.error("Error al obtener las tareas:", error);
            });
          break;
        case "0":
          console.log("¡Gracias, vuelve pronto!");
          process.exit(0);
          break;
        default:
          console.log(
            "Opción inválida. Por favor, seleccione una opción válida."
          );
          mostrarMenu();
          break;
      }
    } while (opcion !== 0);
  };
  
  main();