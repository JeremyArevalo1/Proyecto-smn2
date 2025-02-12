import { Router } from 'express';
import { check } from 'express-validator';
import { saveAppoint, getAppoint, searchAppoint, deleteAppoint, updateAppoint } from './appointment.controller.js';
import { existeAppoitById } from '../helpers/db-validator.js'
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

router.post(
    '/',
    [
        validarJWT,
        validarCampos
    ],
    saveAppoint
);

router.get(
    '/',
    getAppoint
);

router.get(
    '/:id',
    [
        validarJWT,
        check('id', 'id isnt valid').isMongoId(),
        validarCampos
    ],
    searchAppoint
);

router.delete(
    '/:id',
    [
        validarJWT,
        check('id', 'id is not valid').isMongoId(),
        validarCampos
    ],
    deleteAppoint
);

router.put(
    '/:id',
    [
        validarJWT,
        check('id', 'No es un ID valido').isMongoId(),
        check('id').custom(existeAppoitById),
        validarCampos
    ],
    updateAppoint
);

export default router;