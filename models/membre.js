import mongoose from "mongoose";
const memberschema = new mongoose.Schema({
    nom :{type: String, required: true},
    prenom: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    telephone: {type: String, required: true},
    adresse: {type: String, required: true},
    role : {type: String, enum:["admin","membre"],default: "membre"}
})
const Membre = mongoose.model("Membre",memberschema)
export default Membre;