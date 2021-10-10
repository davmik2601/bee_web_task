import User from '../models/User.js';
import mongoose from 'mongoose';

class UserService {
  constructor() {  }

  create = async (candedate) => {
    const user = new User(candedate);
    await user.save();
    return user;
  }

  findById = async (id, selected = '') => {
    const user = await User.findById(id).select(selected);
    return user;
  }

  findByEmail = async (email, selected = '') => {
    const user = await User.findOne({email}).select(selected);
    return user;
  }

  findByWorkspace = async (workspace_id, selected = '') => {
    const user = await User.find({workspaces: workspace_id}).select(selected);
    return user;
  }

  verify = async (id, code, selected = '') => {
    const user = await User.findOneAndUpdate({_id: id}, {verification: true}, {new: true}).select(selected);
    return user;
  }

  findByIdAndUpdate = async (id, body, selected = '') => {
    const user = await User.findOneAndUpdate({_id: id}, body, {new: true}).select(selected);
    return user;
  } 

  getUserData = async (id, selected = '') => {
    const user = await User.aggregate([
      {
        $match: {_id: mongoose.Types.ObjectId(id)}
      },
      {
        $lookup: {
          from: "workspaces",
          localField: "workspaces",
          foreignField: "_id",
          as: "workspaces"
        }
      },
      {
        $project: {"password": 0}
      }
    ]);
    return user[0];
  }
}

export default new UserService;