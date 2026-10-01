import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Membre from '../models/membre.js';
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const membre = await Membre.findOne({ email });
        if (!membre) {
            return res.status(404).json({ success: false,message: "Utilisateur non trouvé" });
        }
        const isPasswordValid = await bcrypt.compare(password, membre.password);
        if (!isPasswordValid) {
            return res.status(401).json({success:false, message: "Mot de passe incorrect" });
        }
        const token = jwt.sign({ id: membre._id, role: membre.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
          return res.status(200).json({ 
            success:true,
        message: "Connexion réussie",
        token: token,
        membre: {
            id: membre._id,
            nom: membre.nom,
            prenom: membre.prenom,
            email: membre.email,
            telephone: membre.telephone,
            adresse: membre.adresse,
            role: membre.role
        }
    })
}
     catch (error) {
        res.status(400).json({ message: error.message });
    }   
  
}


export { login };