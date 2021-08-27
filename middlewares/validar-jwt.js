const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uuid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario que corresponde al uuid
        const userAuth = await User.findById(uuid);
        if(!userAuth){
            return res.status(401).json({
                msg: 'Token no válido - no existe'
            })
        }


        // Verificar si el uuid tiene estado true
        if(!userAuth.estado){
            return res.status(401).json({
                msg: 'Token no válido -'
            })
        }

        req.userAuth = userAuth;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }

    

}

module.exports = {
    validarJWT
}