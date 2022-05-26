const express = require("express");

const app = express();


app.use(express.json());


app.use("/", (req, res) => {
    return res.status(200).json("Aoba?")
    
})



app.listen(4000, () => {
    console.log("Server tá dibas!")
})