import Membre from "../models/membre.js";
import jwt from "jsonwebtoken";
const authmiddleware = async (req, res, next) => {
    try {
      const header = req.headers.authorization;
      if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Accès refusé, token manquant" });
      }
      const token = req.headers.authorization.split(" ")[1];
      if (!token) {
        return res.status(401).json({ message: "Accès refusé, token manquant" });
      }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({ message: "Accès refusé, token invalide" });
        
        }

        const  membre = await Membre.findById({ _id: decoded.id });
        if (!membre) {
            return res.status(401).json({ message: "Accès refusé, membre non trouvé" });
        }
        req.membre = membre;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Accès refusé, token invalide" });
    }
};
export default authmiddleware;