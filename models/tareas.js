const Tarea = require('./tarea.js');
require('colors');

class Tareas {

    _listado = {};

    get listadoArr() {
        const listado = [];

        Object.keys(this._listado).forEach( (key) => {
            const tarea = this._listado[key];    
            listado.push(tarea);
        }) 

        return listado
    }

    constructor() {
        this._listado = {};
    }

    cargarTareasFromArray( tareas=[] ) {
        tareas.forEach( (tarea) => {
            this._listado[tarea.id]= tarea;
        })

        return this._listado;
    }


    crearTarea( descripcion = '' ) {
        const tarea = new Tarea(descripcion);
        this._listado[tarea.id] = tarea;
    }

    listadoCompleto(){
        console.log();

        this.listadoArr.forEach( (tarea, i) => {
            let idx= `${i+1}.`.yellow;
            const { descripcion, completadoEn } = tarea;
            const estado = (completadoEn) ? `${'Completada'.green}` : `${'Pendiente'.red}`;

            let tareaTexto = `${idx} ${descripcion} :: ${estado}`

            console.log(tareaTexto);
        
        })

    
    }

    listarTareasCompletadasPendientes( completadas = true ) {

        this.listadoArr.forEach( (tarea, i) => {
            let idx= `${i+1}.`.yellow;
            const { descripcion, completadoEn } = tarea;
            const estado = (completadoEn) ? `${'Completada'.green}` : `${'Pendiente'.red}`; //retorna un 'completo' o 'pendiente'       
            const fechaPendiente = (completadoEn) ? `${completadoEn}` : `${estado}`; //retorna una fecha o un 'pendiente' segun el estado


            if((completadas && completadoEn) || (!completadas && !completadoEn)){
                let tareaTexto = `${idx} ${descripcion} :: ${fechaPendiente.green}`
                console.log(tareaTexto);
            }

        })
    }

    borrarTarea( id = '' ) {
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    toggleCompletadas( ids = [] ){
        //completa las tareas x id del arreglo 'ids'
        ids.forEach( (id) => {
            const tarea= this._listado[id];
            
            if(!tarea.completadoEn){
                tarea.completadoEn= new Date().toISOString();
            }
        })
        
        //Pone en pendiente las tareas q no son incluidas en el arreglo de 'ids'
        this.listadoArr.forEach( (tarea) => {
            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null;
            }
        })

    }

}



module.exports = Tareas;