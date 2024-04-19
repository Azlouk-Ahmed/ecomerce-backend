const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

const generateToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: "365d" })
}

const signUpUser = async (req, res) => {
    const { email, password, fullname, gender } = req.body;
  
    try {
      const user = await User.signUp(email, password, fullname, gender);
      const token = generateToken(user._id);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

const loginUser = async (req, res) => {
    const {email, password} = req.body;
    console.log("hoi",email,password);
    try {
        const user = await User.logIn(email, password);
        const token = generateToken(user._id);
        res.status(200).json({user,token});
    } catch (error) {
        res.status(400).json({error : error.message});
    }
}

const getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};












module.exports = { getAllUsers, getUserById, loginUser, signUpUser };
