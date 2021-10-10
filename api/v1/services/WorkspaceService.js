import Workspace from '../models/Workspace.js';
import UserService from './UserService.js';
import mongoose from 'mongoose';

class WorkspaceService {
  constructor() {  }

  create = async (newWorkspace) => {
    const workspace = new Workspace(newWorkspace);
    await workspace.save();
    await UserService.findByIdAndUpdate(workspace.creator_id, { $push: { workspaces: workspace } });
    return workspace;
  }

  findById = async (id, selected = '') => {
    const workspace = await Workspace.findById(id).select(selected);
    return workspace;
  }

  deleteById = async (id, selected = '') => {
    const workspace = await Workspace.findByIdAndDelete(id).select(selected);
    return workspace;
  }

  update = async (id, body, selected = '') => {
    const workspace = await Workspace.findOneAndUpdate({_id: id}, body, {new: true}).select(selected);
    return workspace;
  }

  getWorkspaceData = async (id, seleced='') => {
    const workspace = await Workspace.aggregate([
      {
        $match: {_id: mongoose.Types.ObjectId(id)}
      },
      {
        $lookup: {
          from: "channels",
          localField: "_id",
          foreignField: "workspace_id",
          as: "channels"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "workspaces",
          as: "users"
        },
      },
      {
        $project: {"users.password": 0, "users.verificationCode": 0,  "users.status": 0}
      }
    ]);
    return workspace[0];
  }
}

export default new WorkspaceService;