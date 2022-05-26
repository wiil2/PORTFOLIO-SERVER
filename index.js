const express = require("express");

const data = require("./data")

const app = express();


app.use(express.json());


//app.use("/", (req, res) => {
  //  return res.status(200).json("Aoba?")
    
//})

app.use("/rotaParaData", (req, res) => {
    data.push(req.body)
        
    return res.status(201).json([...data])
});

app.listen(4000, () => {
    console.log("Server tá dibas!")
})