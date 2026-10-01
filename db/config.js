import mongoose from "mongoose"
const ConnectDb = async() => {
    try {
        await mongoose.connect(process.env.Mongo_URI)
        console.log("connection reuissi avec succées");
        
    } catch (error) {
        console.error(error.message);
        
    }
}

export default ConnectDb