import dotenv from 'dotenv';
dotenv.config();

import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import Membre from './models/membre.js';
import ConnectDb from './db/config.js';

const membres = [
    {
        nom: 'Admin',
        prenom: 'Super',
        email: 'admin@nho.com',
        password: 'admin123',
        telephone: '770000000',
        adresse: 'Dakar',
        role: 'admin'
    }
];

const seed = async () => {
    await ConnectDb();
    try {
        for (const data of membres) {
            const existant = await Membre.findOne({ email: data.email });
            if (existant) {
                console.log(`Membre déjà existant: ${data.email}`);
                continue;
            }
            const hashedPassword = await bcrypt.hash(data.password, 10);
            await Membre.create({ ...data, password: hashedPassword });
            console.log(`Membre créé: ${data.email} / mot de passe: ${data.password}`);
        }
    } catch (error) {
        console.error('Erreur lors du seed:', error.message);
    } finally {
        await mongoose.disconnect();
    }
};

seed();
