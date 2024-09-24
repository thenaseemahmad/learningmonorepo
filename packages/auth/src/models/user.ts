import mongoose, { model, Schema } from "mongoose";
import { hash } from "bcrypt";

interface IUser {
  fName: string;
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema<IUser>({
  fName: { type: String },
  email: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
})

userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashedPassword = await hash(this.password, 10);
    this.password = hashedPassword
  }
  done();
}
)

const User = model<IUser>("User", userSchema);
export default User;