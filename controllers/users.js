const { response } = require('express');

const usersGet = (req, res = response) => {

    // parametros de url -> GET api/users?q=hola&nombre=Claudio&api_key=alskdjfjdsakl
    // const params = req.query; 
    const {q, nombre = 'No name', api_key, page = 1, limit = 10} = req.query; 

    // enviamos un json
    res.json({
        msg:'get API - controller',
        q,
        nombre,
        api_key,
        page,
        limit
    });

}

const usersPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    // enviamos un json
    res.json({
        msg:'post API - controller',
        nombre,
        edad
    });

}

const usersPut = (req, res = response) => {

    const id = req.params.id;

    // enviamos un json
    res.json({
        msg:'put API - controller',
        id
    });

}

const usersPatch = (req, res = response) => {

    
    // enviamos un json
    res.json({
        msg:'patch API - controller'
    });

}

const usersDelete = (req, res = response) => {

    // enviamos un json
    res.json({
        msg:'delete API - controller'
    });

}

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete
}