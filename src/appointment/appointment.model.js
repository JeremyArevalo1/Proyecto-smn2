import { Schema, model } from "mongoose";

const AppointmentSchema = Schema({
    date: {
        type: String,
        required: true
    },
    hour: {
        type: String,
        required: true,
    },
    keeper: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    pet: {
        type: Schema.Types.ObjectId,
        ref: "pet",
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default model("Appoint", AppointmentSchema)