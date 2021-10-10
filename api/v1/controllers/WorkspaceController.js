import { validationResult } from "express-validator";
import WorkspaceService from "../services/WorkspaceService.js";
import ChannelService from "../services/ChannelService.js";
import errorHandler from "../utils/errorHandler.js";
import UserService from "../services/UserService.js";

class WorkspaceController {
  constructor() {  }


  create = async (req, res) => {

    try {
      const errorData = validationResult(req).errors;
      let errors = {}
      if(errorData[0]) {
        errorData.forEach(e => {
          errors[e.param] = e.msg;
        });
        return res.status(400).json({success: false, errors: errors});
      };

      const newWorkspace = {
        name: req.body.name.trim(),
        description: req.body.description ? req.body.description : '',
        email: req.body.email ? req.body.email : '',
        creator_id: req.user._id, 
      };

      const workspace = await WorkspaceService.create(newWorkspace);

      return res.status(200).json({success: true, message: "Workspace Created Successfully !", workspace});

    } catch (err) {
      errorHandler(res, err);
    }
  }


  delete = async (req, res) => {

    try {
      const workspace = await WorkspaceService.deleteById(req.params.workspace_id);

      return res.status(200).json({success: true, message: "Workspace Deleted Successfully !", workspace});
      
    } catch (err) {
      errorHandler(res, err);
    }
  }


  update = async (req, res) => {
    
    try {
      const errorData = validationResult(req).errors;
      let errors = {}
      if(errorData[0]) {
        errorData.forEach(e => {
          errors[e.param] = e.msg;
        });
        return res.status(400).json({success: false, errors: errors});
      };

      const body = {
        name: req.body.name.trim(),
        description: req.body.description,
        email: req.body.email,
      };

      const workspace = await WorkspaceService.update(req.params.workspace_id, body);

      return res.status(200).json({success: true, message: "Workspace Updated Successfully !", workspace});
      
    } catch (err) {
      errorHandler(res, err);
    }
  }


  getWorkspaceData = async (req, res) => {

    try {
      const workspace = await WorkspaceService.getWorkspaceData(req.params.workspace_id);

      return res.status(200).json({success: true, message: "This is workspace Data with channels and users", workspace});

    } catch (err) {
      errorHandler(res, err);
    }
  }

}

export default new WorkspaceController;