import mongoose from "mongoose";

const moisSchema = new mongoose.Schema({
    motif: {type: String},
    montant: {type: Number}
}, {_id: false});

const cotisationschema = new mongoose.Schema({
    numcotis: {type: Number},
    date: {type: Date, default: Date.now},
    mois: {
        janvier: moisSchema,
        fevrier: moisSchema,
        mars: moisSchema,
        avril: moisSchema,
        mai: moisSchema,
        juin: moisSchema,
        juillet: moisSchema,
        aout: moisSchema,
        septembre: moisSchema,
        octobre: moisSchema,
        novembre: moisSchema,
        decembre: moisSchema
    },
    matricule: {type: mongoose.Schema.Types.ObjectId, ref: "Membre", required: true}
})

const Cotisation = mongoose.model("Cotisation", cotisationschema)
export default Cotisation;
