import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const adminSchema = new Schema({
  name: String,
  email: { type: String, unique: true, lowercase: true },

  password: { type: String, select: false },

  bussiness: { type: String },

  refreshToken: {
    type: String,
    select: false, // hide by default
  },
}, { timestamps: true });

adminSchema.pre("save", async function(next) {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 10);

  if (this.isModified("pin"))
    this.pin = await bcrypt.hash(this.pin, 10);

  next();
});

adminSchema.methods.isPasswordCorrect = function(p) {
  return bcrypt.compare(p, this.password);
};


adminSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      name: this.name
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
  );
};

adminSchema.methods.generateRefreshToken =  function(){
     return jwt.sign(
        {
            _id: this._id, 
    
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export default mongoose.model("Admin", adminSchema);
