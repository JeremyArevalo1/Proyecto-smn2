import User from "../users/user.model.js";
import Pet from "../pets/pet.model.js";
import Appoint from "./appointment.model.js"

export const saveAppoint = async (req, res) => {
    try{
        console.log("Hola")
        const data = req.body;
        const user = await User.findOne({ email: data.email});
        const pet = await Pet.findOne({ name: data.name});

        if(!user || !pet){
            return res.status(404).json({
                success: false,
                msg: "Property not found"
            })
        }

        const appoint = new Appoint({
            ...data,
            owner: user._id, 
            pet: pet._id
            
        });

        await appoint.save();

        res.status(200).json({
            success: true,
            appoint
        })

    } catch(error){
        console.log("hola")
        res.status(500).json({
            success: false,
            msg: "Error to save the appointment",
            error
        })
    }
}

export const getAppoint = async(req, res) => {
    const { limit = 10, desde = 0 } = req.query;
    const query = { status: true };

    try{
        const appoints = await Appoint.find(query)
            .skip(Number(desde))
            .limit(Number(limit));
        
        const appointWithInfo = await Promise.all(appoints.map(async(appoint) =>{
            const pet = await Pet.findById(appoint.pet);
            const owner = await User.findById(appoint.owner);
            return{
                ...appoint.toObject(),
                pet: pet ? pet.name : "Property not found 1",
                owner: owner ? owner.name : "Property not found 2"
            }
        }));

        const total = await Appoint.countDocuments(query);

        res.status(200).json({
            success: true,
            total,
            appoits: appointWithInfo
        })
    }catch(error){
        res.status(500).json({
            success: false,
            msg: "Error to the get the appointment",
            error
        })
    }
}

export const searchAppoint = async (req, res) => {
    const { id } = req.params;
    try {

        const appoint = await Appoint.findById(id);

        if(!appoint){
            return res.status(400).json({
                success: false,
                msg: "Apoit not found"
            })
        }

        const owner = await User.findById(appoint.owner);
        const pet = await Pet.findById(appoint.pet);

        res.status(200).json({
            success: true,
            appoit: {
                ...appoint.toObject(),
                pet: pet ? pet.name : "Pet not found",
                owner: owner ? owner.name : "Owner not found"
            }
        })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error to find a pet',
            error
        })
    }
}

export const deleteAppoint = async(req, res) => {
    const { id } = req.params;

    try {

        await Appoint.findByIdAndUpdate(id, { status: false });

        res.status(200).json({
            sucess: true,
            msg: "Appoit eliminate successfully"
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: "Error to eliminate this appoit"
        })
    }
}

export const updateAppoint = async (req, res) => {
    try {
        const { id } = req.params;
        const { _id, ...data} = req.body;

        const appoint = await Appoint.findByIdAndUpdate(id, data, {new: true});

        res.status(200).json({
            success: true,
            msg: 'Cita actualizada',
            appoint
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            msg: 'Error al actualizar la cita',
            error
        })
    }
}