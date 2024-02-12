const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");

// @route POST /api/users

const registerUser = asyncHandler(async (req, res) => {
  const { firstname, email, password } = req.body;
  if (!firstname || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // checking if user exists

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // hash password (skliaustuose rasomi kiek papildomu simboliu prideti uzsifruojant)

  const salt = await bcrypt.genSalt(8);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user

  const user = await User.create({
    firstname,
    email,
    passord: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      // sukuriamas json objektas, kuris yra siunciamas response i client
      _id: user.id,
      firstname: user.firstname,
      email: user.email,
      token: generateToken(user._id),
      role: user.role,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// generate jwt: imamas userio id ir prie jo pridedama uzkodavimo druskyte
// papildomas dalykas, kad butu neimanoma atkoduoti is .env failo

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// @ route POST /api/users/login - paimam duomenis is suserio ir siunciam i DB pasitikrint ar toks useris yra

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // user.password - is db uzkoduotas password, lygina login'e ivesta passworda su db esanciu uzkoduotu passwordu
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstname: user.firstname,
      email: user.email,
      // svarbu, kad sugriztu token, kuris sukuriamas
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});
