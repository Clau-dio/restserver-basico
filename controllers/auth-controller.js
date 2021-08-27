const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const User = require("../models/User");

const login = async (req, res) => {
    try {
        const { correo, password } = req.body;
        
        // Verificar si el email existe
        const user = await User.findOne({ correo });

        if(!user){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        // Si el usuario está activo
        if(!user.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado :false'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }
        
        // Generar el JWT
        const token = await generarJWT(user.id);

        res.json({
            token,
            user
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    }
}




module.exports = {
    login
}