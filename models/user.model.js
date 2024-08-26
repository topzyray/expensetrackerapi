import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Firstname is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Lastname is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

// The code in the userScheme.pre() function is called a pre-hook.
// Before the user information is saved in the database, this function will be called,
// it will get the plain text password, hash it, and store it.
// userSchema.pre('save', async (next) => {
//   const user = this;
//   const hash = await bcrypt.hash(this.password, 10);
//   this.password = hash;
//   next();
// });

// This code ensures that the user trying to log in has the correct credentials.
// This is achieved by adding the following new method:
// userSchema.methods.isValidPassword = async (password) => {
//   const user = this;
//   const compare = await bcrypt.compare(password, user.password);
//   return compare;
// };

const User = mongoose.model("User", userSchema);

export default User;
