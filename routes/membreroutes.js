import express from 'express'
import {ajouterMembre,modifermembre,obtenirMembre,deleteMembre} from '../controller/Membre.js'
import authmiddleware from '../middleware/authmiddleware.js'
const router = express.Router()

router.post('/ajouter',authmiddleware, ajouterMembre);
router.get('/obtenir',authmiddleware,obtenirMembre)
router.put('/update/:id',authmiddleware, modifermembre)
router.delete('/supprimer/:id',authmiddleware, deleteMembre)

export default router