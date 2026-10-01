import express from "express"
import { login } from "../controller/Auth.js";

const router = express.Router()

router.post("/login",login)
export default router