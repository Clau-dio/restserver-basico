const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');
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

const googleSignin = async (req, res) => {

    const { id_token } = req.body;

    try {
        
        const {nombre, img, correo } = await googleVerify(id_token);
        
        let user = await User.findOne({ correo });

        if(!user){

            //tengo que crearlo
            const data = {
                nombre,
                correo, 
                password: ':P',
                img,
                google: true
            };

            user = new User( data );

            await user.save();

        }

        // Si el usuario en DB
        if(!user.estado){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            })
        }

        // Generar el JWT
        const token = await generarJWT( user.id );

        res.json({
            user,
            id_token
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Token de Google no es válido'
        });
    }
}



module.exports = {
    login,
    googleSignin
}