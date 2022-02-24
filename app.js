require('colors');

const { inquirerMenu, 
    pausaMenu, 
    leerInput, 
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist,
} = require('./helpers/inquirer.js');
const { guardarInfoDb, leerInfoDb } = require('./helpers/guardarArchivo.js');
const Tareas = require('./models/tareas.js');


const main = async() => {

    let opt = '';
    const tareas = new Tareas();

    const tareasDb = leerInfoDb();

    if(tareasDb){
        //establecer tareas
        tareas.cargarTareasFromArray(tareasDb);
    }


    do {
        opt = await inquirerMenu();
        //console.log({ opt });
        
        switch (opt) {
            case '1': //Crear tarea
                const descripcion = await leerInput('Descripcion: ')
                tareas.crearTarea(descripcion)
                break;

            case '2': //Listar Tareas
                tareas.listadoCompleto()
                break;

            case '3': //Listar tareas completadas
                tareas.listarTareasCompletadasPendientes(true)
                break;

            case '4': //Listar tareas pendientes
                tareas.listarTareasCompletadasPendientes(false)
                break;

            case '5': //Completar tareas
                const ids = await mostrarListadoChecklist( tareas.listadoArr )
                tareas.toggleCompletadas(ids);
                break;

            case '6': // Borrar tarea
                const id = await listadoTareasBorrar( tareas.listadoArr )
                
                if( id !== '0' ){//Borra la tarea si la opcion es diferente de 'Cancelar'
                    const ok = await confirmar('¿Esta seguro de borrar esta tarea?');
                    if( ok ){
                        tareas.borrarTarea(id);
                        console.log("tarea borrada satisfactoriamente");
                    } 
                }
                break;
        
        }

        guardarInfoDb( tareas.listadoArr );

        if(opt!=='0') await pausaMenu()

    } while ( opt!=='0' );

}

main();