import express from "express"

const AuthRouter = express.Router();

AuthRouter.get("/token", (req, res) => {
    if(req.headers["authorization"] === "bearer 12345b67"){
        res.json({"ok": "ok"})
    }
    else res.status(401).json({ ok: false });
})

export default AuthRouter