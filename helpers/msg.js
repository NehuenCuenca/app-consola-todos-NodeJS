require('colors');

const mostrarMenu = () => {

    return new Promise((resolve, reject) => {
        console.clear();
        console.log("===========================".green);
        console.log("    Seleccion una opcion    ".green);
        console.log("===========================\n".green);

        console.log(`${'1.'.green} Crear una tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea(s)`);
        console.log(`${'0.'.green} Salir de la app \n`);

        //readline: interfaz para mostrar y recibir informacion al usuario
        const readLine = require('readline').createInterface({
            input: process.stdin, //hace pausar la ejecucion de la app para recibir instrucciones del user
            output: process.stdout, //muestra un msj en consola al user cuando le estoy pidiendo que realice alguna accion 
        });

        readLine.question("Seleccione una opcion: ", (opcion) => {
            readLine.close();
            resolve(opcion);
        });
    });    
}

const pausa = () => {
    return new Promise((resolve, reject) => {
        const readLine = require('readline').createInterface({
            input: process.stdin, //hace pausar la ejecucion de la app para recibir instrucciones del user
            output: process.stdout, //muestra un msj en consola al user cuando le estoy pidiendo que realice alguna accion 
        });
    
        readLine.question(`\nPresione ${'ENTER'.green} para continuar\n`, (opcion) => {
            readLine.close();
            resolve();
        })
    })

    
}

module.exports = {
    mostrarMenu,
    pausa
}