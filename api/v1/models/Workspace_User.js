import mongoose from 'mongoose';

const workspace_user_Schema = new mongoose.Schema({
  workspace_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

const Workspace_User = mongoose.model("Workspace_User", workspace_user_Schema);

export default Workspace_User;