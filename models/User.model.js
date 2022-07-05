const { Schema, model, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,},

    citystate: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true }, 
    age: { type: String },
    description:  { type: String },
    denomination: { type: String },
    passwordHash: { type: String, required: true, match:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/, trim: true},
    img: { type: String, default: "https://cdn3.iconfinder.com/data/icons/avatars-15/64/_Ninja-2-512.png" },
    role: { type: String, enum: ["PROFISSIONAL", "CLIENTE"], default: "CLIENTE" },
    finished: [{type: mongoose.Types.ObjectId, ref: "Projects"}],
    inProgress: [{type: mongoose.Types.ObjectId, ref: "Projects"}]
});


const UserModel = model("User", userSchema);

module.exports = UserModel;