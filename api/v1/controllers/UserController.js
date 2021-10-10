import { validationResult } from "express-validator";
import errorHandler from "../utils/errorHandler.js";
import UserService from "../services/UserService.js";
import fs from 'fs';
import { promisify } from 'util';
const unlinkAsync = promisify(fs.unlink);


class UserController {
  constructor() {  }


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

      let body = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        status: req.body.status,
        displayName: req.body.displayName
      }

      /////////////////////////  Auto Increment DisplayName   //////////////////////////////

      if(body.displayName) {

        const users = await UserService.findByWorkspace(req.params.workspace_id, "-password");

        let usersByThisDisplayName = users.filter(user => user.displayName == body.displayName);
        let i = 1;

        while(usersByThisDisplayName.length > 0) {
          if(i > 1) {
            body.displayName = body.displayName.substring(0, body.displayName.indexOf("_"))
          }
          body.displayName = body.displayName + '_' + i;
          usersByThisDisplayName = users.filter(user => user.displayName == body.displayName);
          i++;
        }
      }

      const user = await UserService.findByIdAndUpdate(req.user.id, body, "-password");

      req.user = user;

      return res.status(200).json({success: true, message: "User Updated Successfully !", user});

    } catch (err) {
      errorHandler(res, err);
    }
  }

  
  updateAvatar = async (req, res) => {

    try {

      if(req.fileError) {
        return res.status(400).json({success: false, message: req.fileError});
      };

      const old = await UserService.findById(req.user.id, "avatar");
      const oldAvatar = old.avatar;
      
      const body = {
        avatar: req.file.filename,
      }
      const user = await UserService.findByIdAndUpdate(req.user.id, body, "-password");
      
      req.user = user;
      
      unlinkAsync(`uploads/user_avatars/${oldAvatar}`);
      
      return res.status(200).json({success: true, message: "Avatar Updated Successfully !", user})

    } catch (err) {
      errorHandler(res, err);
    }
  }


  getUserData = async (req, res) => {

    try {
      const user = await UserService.getUserData(req.params.user_id);

      return res.status(200).json({success: true, message: "This is userData with workspaces", user});

    } catch (err) {
      errorHandler(res, err);
    }
  }
}

export default new UserController;