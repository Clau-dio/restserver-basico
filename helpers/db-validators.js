const Role = require("../models/Role");
const User = require("../models/User");


const esRoleValido = async (rol = '') => {
    const existeRole = await Role.findOne({ rol });
    if(!existeRole){
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
}

const emailExiste = async (correo = '') => {
    const existeEmail = await User.findOne({ correo });
    if(existeEmail){
        throw new Error(`El correo: ${correo}, ya está registrado`);
    }
}

const existeUsuarioPorId = async ( id ) => {
    const existeUsuario = await User.findById(id);
    if(!existeUsuario){
        throw new Error(`El usuario no existe`);
    }
}


module.exports = {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}