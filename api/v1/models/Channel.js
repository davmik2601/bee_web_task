import mongoose from 'mongoose';

const channelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  channel_type: {
    type: String,
    required: true,
    enum: ["public", "private"],
    default: "public",
  },
  workspace_id: {
    type: mongoose.Types.ObjectId,
    ref: 'Workspace',
    required: true,
  },
  creator_id: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  users: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    }
  ]
});

const Channel = mongoose.model("Channel", channelSchema);

export default Channel;