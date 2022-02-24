const FS = require('fs');

const archivo = './db/data.json'

const guardarInfoDb = ( data ) => {
    FS.writeFileSync(archivo, JSON.stringify(data));
}


const leerInfoDb = () => {
    if(!FS.existsSync(archivo)){
        return null;
    }

    const info = FS.readFileSync(archivo, {encoding: 'utf-8'})
    const data = JSON.parse(info)

    // console.log(data);
    return data;
}


module.exports = {
    guardarInfoDb,
    leerInfoDb,
}