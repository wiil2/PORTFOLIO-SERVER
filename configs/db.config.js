const mongoose = require("mongoose")

async function connect() {

    try {

        const dbConnection = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Conectado ao DB:", dbConnection.connections[0].name)

    } catch (err) {
        console.log("Não conectou dibas!", err)
    }
    
}

module.exports = connect;