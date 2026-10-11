import express from "express";
import { CrerCotisation, obtenirCotisation,modifierCotisation ,supprimerCotisation} from "../controller/Cotisation.js";
import authmiddleware from "../middleware/authmiddleware.js";
const router = express.Router();

router.post("/ajouter", CrerCotisation);
router.get("/obtenir", authmiddleware, obtenirCotisation);
router.put("/modifier/:id", authmiddleware, modifierCotisation);
router.delete("/supprimer/:id", authmiddleware, supprimerCotisation);

export default router;