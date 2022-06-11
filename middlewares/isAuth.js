const {expressjwt: expressJWT} = require("express-jwt")

module.exports = espressJWT({
    secret: process.env = TOKEN_SIGN_SECRET,
    algorithms: ["HS256"],
});

