import mongoose from 'mongoose';

const workspaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    match: /^[a-zA-Z ]*$/,
    trim: true,
  },
  description: {
    type: String,
    maxlength: 1000,
    default: '',
  },
  creator_id: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    // unique: true,
    // match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
  },
});

const Workspace = mongoose.model("Workspace", workspaceSchema);

export default Workspace;