const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    nome: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,},

    cidadeEestado: { type: String, required: true, trim: true },
    fone: { type: String, required: true, trim: true }, 
    passwordHash: { type: String, required: true, match:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, trim: true},
    terminados: [{type: mongoose.Types.ObjectId, ref: "Projetos"}],
    emAndamento: [{type: mongoose.Types.ObjectId, ref: "Projetos"}]
});


const UserModel = model("User", userSchema);

module.exports = UserModel;