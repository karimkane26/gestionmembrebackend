import express from "express";
import Cotisation from '../models/cotisation.js'
const CrerCotisation = async(req,res) => {
    try {
         const{mois,motif, montant, membreId} = req.body
    const cotisation = new Cotisation(
        {
        mois: {[mois]: {motif, montant}},
        matricule: membreId
    })
    await cotisation.save()
    res.status(201).json(cotisation)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
   
}

const obtenirCotisation = async(req,res) => {
    try {
        const cotisations = await Cotisation.find().populate("matricule", "nom prenom")
        return res.status(200).json({ cotisations })
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const modifierCotisation = async(req,res) => {
    try {
        const { id } = req.params;
        const { mois, motif, montant } = req.body;

        const cotisation = await Cotisation.findById(id);
        if (!cotisation) {
            return res.status(404).json({ message: "Cotisation non trouvée" });
        }

        // Mettre à jour les informations de la cotisation
        cotisation.mois[mois] = { motif, montant };
        await cotisation.save();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}   


const supprimerCotisation = async (req,res) => {
    try {
    const {id} = req.params
        await Cotisation.findByIdAndDelete(id)
        return res.status(201).json({success:true, message: 'Suppression reuissi'})
    } catch (error) {
        res.status(500).json({success:false,message:'Erreur Interne'})
    }
    
}

export {CrerCotisation, obtenirCotisation,modifierCotisation, supprimerCotisation}