const express = require("express");


const app = express();

const dotenv = require("dotenv")
dotenv.config();

const dbConnect = require("./configs/db.config");
dbConnect();

app.use(express.json());


const userRouter = require("./routes/user.routes");
app.use("/user", userRouter);


app.listen(Number(process.env.PORT), () => {
    console.log("Server Conectado dibas! PORT:", process.env.PORT);
})