const { response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/User');




const usersGet = async (req, res = response) => {
    
    const { limite = 5, desde = 0 } = req.query;

    const query = {estado:true}

    // dos bloqueantes
    // const users = await User.find(query).skip(Number(desde)).limit(Number(limite));
    // const total = await User.countDocuments(query);

    /**
     * Ejecuta las promesas de manera simultanea y 
     * no va a continuar hasta que ambas promesas hayan sido resueltas
     */
    // un bloqueante
    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    // enviamos un json
    res.json({
        total,
        users
    });

}

const usersPost = async (req, res = response) => {
    const {nombre, correo, password, rol} = req.body;

    const user = new User({nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await user.save();

    // enviamos un json
    res.json(user);

}

const usersPut = async (req, res = response) => {

    const { id } = req.params;
    const { _id, password, google, correo, ...resto} = req.body;

    if( password ){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    // enviamos un json
    res.json(user);

}

const usersPatch = (req, res = response) => {

    
    // enviamos un json
    res.json({
        msg:'patch API - controller'
    });

}

const usersDelete = async (req, res = response) => {

    const { id } = req.params;
    
    // Fisicamente lo borramos
    // const user = await User.findByIdAndDelete ( id );
    
    // Borrado logico
    const user = await User.findByIdAndUpdate(id, { estado:false });

    // enviamos un json
    res.json(user);

}

module.exports = {
    usersGet,
    usersPost,
    usersPut,    usersPatch,
    usersDelete
}