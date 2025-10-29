export default function logger (req, res, next) {
    console.log("Recieved Request from: ", req.host + req.url)
    next();
}
