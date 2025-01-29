import { Schema, model } from "mongoose";

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'name in required'],
        maxLength: [25, 'cant be  overcome 25 characters']
    },
    surname: {
        type: String,
        required: [true, 'Surname in required'],
        maxLength: [25, 'cant be  overcome 25 characters']
    },
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    phone: {
        type: String,
        mainLength: 8,
        maxLength: 8,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
},

    {
        timestamps: true,
        versionKey: false
    }

);

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

export default mongoose.model('user', UserSchema);