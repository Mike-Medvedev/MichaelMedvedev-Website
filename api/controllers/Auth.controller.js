import express from "express"

const AuthRouter = express.Router();

AuthRouter.post("/token", (req, res) => {
    if(req.headers["authorization"] === "bearer 12345b67"){
        res.sendStatus(200)
    }
    else res.sendStatus(401)
})

export default AuthRouter