import mongoose from "mongoose";

const moisSchema = new mongoose.Schema(
  {
    motif: {
      type: String,
    },
    montant: {
      type: Number,
    },
  },
  {
    _id: false,
  }
);

const cotisationSchema = new mongoose.Schema(
  {
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
      decembre: moisSchema,
    },

    matricule: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Membre",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Cotisation = mongoose.model("Cotisation", cotisationSchema);

export default Cotisation;