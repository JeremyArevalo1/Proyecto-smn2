import Role from '../role/role.model.js';
import User from '../users/user.model.js';
import Appoit from '../appointment/appointment.model.js';

export const esRoleValido = async(role = '') =>{
    const existeRol = await Role.findOne({ role });

    if (!existeRol) {
        throw new Error(`El rol ${role} no existe en la base de datos`);
    }
}

export const existenteEmail = async (correo = '') => {
    const existeEmail = await User.findOne({ correo });

    if (existeEmail) {
        throw new Error(`El correo ${correo} ya existe en la base de datos`);
    }
}

export const existeUsuarioById = async (id = "") =>{
    const existeUsuario = await User.findById(id);

    if (!existeUsuario) {
        throw new Error(`El Id ${id} no existe`);
        
    }
}

export const existeAppoitById = async (id = '') => {
    const existeAppoit = await Appoit.findById(id);
    
    if(!existeAppoit){
        throw new Error(`La cita con el id ${id} no existe en la base de datos`)
    }
}