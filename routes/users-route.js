/* Definicion de rutas express */
const { Router } = require ('express');

/* Validaciones */
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

/* Controladores */
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users-controller');

// funcion para configurar rutas
const router = Router();

/* Petición GET */
router.get('/', usersGet);

/* Petición POST */
router.post('/', [
    // Validaciones
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password deve ser más de 6 letras').isLength({min: 6}),
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom( emailExiste ),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRoleValido ), // el primer argumento que esta emitiendo el custom se envia a la funcion esrolevalido (esRoleValido(rol))
    validarCampos
], usersPost);

/* Petición PUT */
/* parametros de segmento */
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
], usersPut);

/* Petición PATCH */
router.patch('/', usersPatch);

/* Petición DELETE */
router.delete('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos // por el check
], usersDelete);

module.exports = router;