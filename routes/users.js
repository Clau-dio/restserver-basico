/* Definicion de rutas express */
const { Router } = require ('express');

/* Controladores */
const { usersGet, usersPost, usersPut, usersPatch, usersDelete } = require('../controllers/users');

// funcion para configurar rutas
const router = Router();

/* Petición GET */
router.get('/', usersGet);

/* Petición POST */
router.post('/', usersPost);

/* Petición PUT */
/* parametros de segmento */
router.put('/:id', usersPut);

/* Petición PATCH */
router.patch('/', usersPatch);

/* Petición DELETE */
router.delete('/', usersDelete);


module.exports = router;