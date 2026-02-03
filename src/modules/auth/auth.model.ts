import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt"; //for password encryption before storing
import { z } from "zod";

interface IUser {
  _id?: mongoose.Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export const UserZodSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const UserSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please fill a valid email address",
    ],
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    const hash = await bcrypt.hash(user.password, 10);
    user.password = hash;
  }
  console.log("pre save hook called");
  next();
});

// Add a method to compare passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
):Promise<boolean> {
  const password: string = this.password;
  return bcrypt.compare(String(candidatePassword), password);
};

const UserModel = model<IUser>("User", UserSchema);


async function existingUser(email:string): Promise<IUser | null> {
    try{
      return await UserModel.findOne({ email: email });
    }catch(err){
      throw err;
    }
}


async function createUser(email:string, password:string, fullName:string) {
    const newUser = UserModel.create({ email, password, fullName });
    return newUser;
}

export const authModel = {
    existingUser,
    createUser
}
