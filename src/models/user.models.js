import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      //  database mai kissi bhi field ko searchable banana h toh uska index true krdo.
      index: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    fullname: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, //cloudinary url
      required: true,
    },
    coverImage: {
      type: String, //cloudinary url
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Videor",
        required: true,
      },
    ],
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // checking if password change hua h ki nhi ..
  if (!this.isModified("password")) return next(); //nhi hua h toh nikl jaoo.

  //   agr hua h toh phir yeh kro.
  this.password = bcrypt.hash(this.password, 10); // bcrypt ke pass ek method hai hash jisse vo password ko encrypt krta h , and jo hmne number diya h 10 uttne rounds mai encrpt kr dega.

  next();
});

// aapko jitne method chahiye utne aap apne schema mai inject kr sakte ho.
userSchema.methods.isPasswordCorrect = async function (password) {
  //  bcrypt ke pass ek method h compare jisse ki vo original password and encrpted password ko compare kr deta h aur return kr deta h .
  return await bcrypt.compare(password, this.password);
};

// jwt tokens.
userSchema.methods.generateAccessToken = function () {
  jwt.sign(
    {
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const UserSchema = mongoose.model("UserSchema", userSchema);
