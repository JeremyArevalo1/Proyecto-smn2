import { Router } from "express";
import { check } from "express-validator";
import { savePet, getPets, searchPet, deletePet, updatePet } from "./pet.controller.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";

const router = Router();

router.post(
    "/",
    [
        validarJWT,
        check('email', 'Este no es un correo valido').not().isEmpty(),
        validarCampos
    ],
    savePet
)

router.get(
    "/", getPets
)

router.get(
    "/:id",
    [
        validarJWT,
        check("id", "no es un id valido"),
        validarCampos
    ],
    searchPet
)

router.delete(
    "/:id",
    [
        validarJWT,
        check("id", "No es un id valido"),
        validarCampos
    ],
    deletePet
)

router.put(
    "/:id",  // El id de la mascota se pasa como parámetro
    [
        validarJWT,  // Valida que el usuario esté autenticado (si es necesario)
        check("id", "No es un id válido").isMongoId(),  // Verifica que el ID sea un id válido de Mongo
        validarCampos  // Valida que no haya errores de validación
    ],
    updatePet  // Llama al controlador editPet que ya has creado
)


export default router;