const User = require("../models/User");
const bcrypt = require("bcryptjs");
const userController = {};

userController.createUser = async (req, res) => {
  try {
    let { email, password, name, level } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw new Error("User already exist");
    }
    //암호화 bcryptjs
    const salt = await bcrypt.genSaltSync(10); // 10번을 걸쳐.
    password = await bcrypt.hash(password, salt); //hash 암호화
    const newUser = new User({
      email,
      password,
      name,
      level: level ? level : "cutomer",
    });
    await newUser.save();
    return res.status(200).json({ status: "Success" });
  } catch (error) {
    res.status(400).json({ status: "Fail", error: error.message });
  }
};

module.exports = userController;
