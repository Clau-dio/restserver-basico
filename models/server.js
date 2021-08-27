/* servidor express */
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;

        /* ruta usuarios */
        this.usersRoutesPath = '/api/users';

        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        // Funciones que siempre se ejecutaran al levantar el servidor
        // se encargan de agregan mas funcionalidades al servidor
        // En general, el middleware se encarga de las tareas de gestión de datos, 
        // servicios de aplicaciones, mensajería, autenticación y gestión de API.
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB () {
        await dbConnection();
    }
    
    middlewares() {

        // CORS
        this.app.use(cors());

        // lectura y parseo del body
        this.app.use(express.json()); // toda la informacion que venga en post, put, delete la serializará en json

        // Directorio público
        this.app.use(express.static('public'));

    }

    // Configura las rutas
    routes(){

        // Rutas de usuario
        this.app.use(this.usersRoutesPath, require('../routes/users-route'));
    }

    // Habilitamos el puerto
    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}

module.exports = Server;
