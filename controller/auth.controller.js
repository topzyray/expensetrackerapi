import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import config from "../config/config.js";

// Signup route
export const signUp = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists." });

    const hashedPassword = bcrypt.hashSync(password, 10);
    await User.create({ firstName, lastName, email, password: hashedPassword });
    res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// // Signup route
// export const signUp = async (req, res) => {
//   try {
//     const { firstName, lastName, email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user) return res.status(400).json({ message: "User already exists." });

//     const hashedPassword = bcrypt.hashSync(password, 10);
//     await User.create({ firstName, lastName, email, password: hashedPassword });
//     res.status(201).json({ message: "User created successfully." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error." });
//   }
// };

// Signin route
export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser)
      return res.status(400).json({ message: "Invalid email or password." });
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword)
      return res.status(400).json({ message: "Invalid email or password." });

    const token = jwt.sign({ id: validUser._id }, config.JWT_SECRET, {
      expiresIn: "1h",
    });
    const { password: hashedPassword, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { httpOnly: false })
      .status(200)
      .json({
        success: true,
        data: {
          validUser: rest,
        },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  }
};

// Sign out
export const signOut = (req, res) => {
  res.clearCookie("access_token").status(200).json({
    success: true,
    message: "Signout success",
  });
};

// export const signIn = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const validUser = await User.findOne({ email });
//     if (!validUser)
//       return res.status(400).json({ message: 'Invalid email or password.' });
//     const validPassword = bcrypt.compareSync(password, validUser.password);
//     if (!validPassword)
//       return res.status(400).json({ message: 'Invalid email or password.' });

//     const token = jwt.sign({ id: validUser._id }, config.JWT_SECRET, {
//       expiresIn: '1h',
//     });
//     console.log(validUser._doc);
//     res.json({ token });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error.' });
//   }
// };
