const inquirer = require('inquirer'); //paquete inquirer
require('colors');


const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que deseas hacer?',
        choices: [
            {
                value: '1',
                name: `${'1'.magenta}. Crear tarea`
            },
            {
                value: '2',
                name: `${'2'.magenta}. Listar tareas`
            },
            {
                value: '3',
                name: `${'3'.magenta}. Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4'.magenta}. Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5'.magenta}. Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6'.magenta}. Borrar tarea`
            },
            {
                value: '0',
                name: `${'0'.magenta}. Salir de aplicacion`
            },
        ]
    },

];

const inquirerMenu = async() => {
    console.clear();

    console.log("===========================".green);
    console.log("    Seleccion una opcion    ".white);
    console.log("===========================\n".green);

    const { opcion } = await inquirer.prompt(preguntas);    

    return opcion
}

const pausaMenu = async() => {
    const pregunta = {
        type: 'input',
        name: 'enter',
        message: `Presione ${ 'ENTER'.green } para continuar`,   
    }
    
    console.log("\n");
    await inquirer.prompt(pregunta)
}

const leerInput = async( message ) => {
    const pregunta = {
        type: 'input',
        name: 'descripcion',
        message,   
        validate( value ) {
            if(value.length === 0){
                return 'ERROR: escriba alguna tarea porfavor';
            } 

            return true;
        },
    };

    const { descripcion } = await inquirer.prompt(pregunta)
    return descripcion
}

const listadoTareasBorrar = async( tareas = [] ) => {
    //opciones de la lista del menu
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1+'.'}`.green

        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
        }
    });

    //agrego opcion para cancelar el borrado
    choices.unshift({
        value: '0',
        name: `${'0.'.green} Cancelar`,
    });

    //menu con las opciones (tareas a borrar)
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices,
        }
    ]

    //retorno el id de la tarea a borrar, que genial q es aprender node
    const { id } = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async( message ) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message,
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoChecklist = async( tareas = [] ) => {
    //opciones de la lista del menu
    const choices = tareas.map( (tarea, i) => {
        const idx = `${i+1+'.'}`.green

        return {
            value: tarea.id,
            name: `${idx} ${tarea.descripcion}`,
            checked: (tarea.completadoEn) ? true : false,
        }
    });


    //menu con las opciones (tareas a completar)
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices,
        }
    ]

    //retorno ids de las tareas a completar
    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}



module.exports= {
    inquirerMenu,
    pausaMenu,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist,
}