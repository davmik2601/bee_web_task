import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    minlength: 2,
    maxlength: 50,
    trim: true,
    // required: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
  displayName: {
    type: String,
    default: '',
  },
  phone: {
    type: String,
    // required: true,
    maxlength: 15,
    default: '',
  },
  status: {
    type: String,
    maxlength: 200,
    default: '',
  },
  avatar: {
    type: String,
    default: '',
  },
  verification: {
    type: Boolean,
    required: true,
    default: false,
  },
  verificationCode: {
    type: String,
    default: '',
  },
  workspaces: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Workspace",
    }
  ]
});

const User = mongoose.model("User", userSchema);

export default User;