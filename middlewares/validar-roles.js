const esAdmidRole = (req, res, next) => {

    if(!req.userAuth){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const {rol, nombre} = req.userAuth;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${nombre} no es administrador - No puede hacer esto`
        });
    }

    next();
}

const tieneRole = (...roles) => {
    return (req, res, next) => {

        if(!req.userAuth){
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar el token primero'
            });
        }

        if(!roles.includes(req.userAuth.rol)){
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }

        console.log(roles);
        next();
    }
}


module.exports = {
    esAdmidRole,
    tieneRole
}