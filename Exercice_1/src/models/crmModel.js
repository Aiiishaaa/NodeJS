import mongoose from 'mongoose'

const Schema = mongoose.Schema;

//Configuration du schéma
export const ContactSchema = new Schema({
    firstName: {
        type: String,
        required: ' Entrer votre prénom' // Champ obligatoire
    },
    lastName: {
        type: String,
        required: ' Entrer votre nom de famille ' // Champ obligatoire
    },
    email: {
        type: String
    },
    phone: {
        type: Number,
    },

    created_date: {
        type: Date,
        default: Date.now
    }
})