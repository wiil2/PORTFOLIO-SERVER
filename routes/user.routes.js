const router = require("express").Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/User.model");
const isAuth = require("../middlewares/isAuth");
const generateToken = require("../configs/jwt.config");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const saltRounds = 10;

router.post("/signup", async (req, res) => {
  try {
    const { password } = req.body;

    if (
      !password ||
      !password.match(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
      )
    ) {
      return res.status(400).json({
        msg: "Password is required and must have at least 8 characters, uppercase and lowercase letters, numbers and special characters.",
      });
    }

    const salt = await bcrypt.genSalt(saltRounds);
    const passwordHash = await bcrypt.hash(password, salt);

    const createdUser = await UserModel.create({
      ...req.body,
      passwordHash: passwordHash,
    });

    delete createdUser._doc.passwordHash;

    return res.status(201).json(createdUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email: email })

    if (!user) {
      return res.status(400).json({ msg: "Wrong password or email" });
    }

    if (await bcrypt.compare(password, user.passwordHash)) {
      delete user._doc.passwordHash;
      const token = generateToken(user);

      return res.status(200).json({
        token: token,
        user: { ...user._doc },
      });
    } else {
      return res.status(400).json({ msg: "Wrong passowrd or email" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get("/profile", attachCurrentUser, async (req, res) => {
  const user = await UserModel.findById(req.currentUser._id).populate("projects");
  return res.status(200).json(user);
});

router.get("/profile/:id", async (req, res) => {
   
  try{
      const profileById = await UserModel.find({ _id: req.params.id }).populate("projects")
      return res.status(200).json(profileById);

  } catch (err) {
      console.log(err)
      res.status(500).json(err)
  }

})

router.patch("/profileEdit", isAuth, attachCurrentUser, async (req, res) => {
  console.log(req.body);
  try {
    const loggedInUser = req.currentUser;

    const updatedUser = await UserModel.findOneAndUpdate(
      { _id: loggedInUser._id },
      { ...req.body },
      { new: true, runValidators: true }
    );

    delete updatedUser._doc.passwordHash;

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.delete("/delete-user", isAuth, attachCurrentUser, async (req, res) => {
  try {
    const deletedUser = await UserModel.deleteOne({ _id: req.currentUser._id });

    return res.status(200).json(deletedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

module.exports = router;
