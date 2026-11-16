import express from "express"
import { requireAdmin } from "../middleware/admin.middleware.js"

const AuthRouter = express.Router();

AuthRouter.get("/token", requireAdmin, (req, res) => res.json({ ok: true }))

export default AuthRouter
