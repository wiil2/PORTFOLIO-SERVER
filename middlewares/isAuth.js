const {expressjwt: expressjwt} = require("express-jwt")


function extractTokenFromHeaders(req,res) {
    if (!req.headers.authorization) {
        return res.status(400).json({msg: "Missing Auth Header" });
    }
    return req.headers.authorization.split(" ")[1];
}

module.exports = expressjwt({
    secret: process.env.TOKEN_SIGN_SECRET,
    getToken: extractTokenFromHeaders,
    algorithms: ["HS256"],
});

