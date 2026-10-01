import Membre from "../models/membre.js";
import bcrypt from "bcryptjs";
const obtenirMembre = async (req, res) => {
    try {
        const membres = await Membre.find().select("-password");
       return res.status(200).json({ membres });
    } catch (error) {
       return res.status(500).json({ message: error.message });
    }
};


const ajouterMembre = async (req, res) => {
    try{
        const { nom, prenom, email,password, telephone, adresse ,role} = req.body;
        if (!nom || !prenom || !email || !password || !telephone || !adresse) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }
        if (typeof password !== "string") {
            return res.status(400).json({ message: "Le mot de passe doit être une chaîne de caractères" });
        }
        const utilisateurExistant = await Membre.findOne({ email });
        if (utilisateurExistant) {
            return res.status(400).json({ message: "L'utilisateur existe déjà" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const membre = new Membre({
             nom, prenom, email, password: hashedPassword, telephone, adresse ,role});
        await membre.save();
        res.status(201).json(membre);
    }
    catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const modifermembre = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      prenom,
      nom,
      email,
      password,
      telephone,
      adresse,
      role
    } = req.body;

    const updateUser = {

      prenom: prenom,

      nom: nom,

      email: email,

      telephone: telephone,

      adresse: adresse,

      role: role

    };

    if (password !== "") {

      const nouveauMotDePasse = await bcrypt.hash(password, 10);

      updateUser.password = nouveauMotDePasse;

    }

    await Membre.findByIdAndUpdate(id, updateUser);

    return res.status(200).json({
      success: true,
      message: "Modification réussie"
    });

  }

  catch (error) {

    return res.status(500).json({
      success: false,
      message: "Erreur interne"
    });

  }

};


const deleteMembre = async (req,res) => {
    try {
    const {id} = req.params
        await Membre.findByIdAndDelete(id)
        return res.status(201).json({success:true, message: 'Suppression reuissi'})
    } catch (error) {
        res.status(500).json({success:false,message:'Erreur Interne'})
    }
    
}
export { ajouterMembre, obtenirMembre , modifermembre,deleteMembre };
