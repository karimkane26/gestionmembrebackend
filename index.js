import dotenv from 'dotenv'
dotenv.config();
import Memberoutes from './routes/membreroutes.js'
import authRoutes from './routes/AuthRoutes.js'
import ConnectDb from "./db/config.js";
import express from 'express'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use('/api/membres', Memberoutes)
app.use('/api/auth',authRoutes)

app.listen(process.env.PORT,() => {
    ConnectDb()
      console.log(`Server is running on port http://localhost:3000`)
})