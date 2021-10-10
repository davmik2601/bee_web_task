import { validationResult } from "express-validator";
import ChannelService from "../services/ChannelService.js";
import errorHandler from "../utils/errorHandler.js";

class ChannelController {
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

      const newChannel = {
        name: req.body.name.trim(),
        channel_type: req.body.channel_type,
        creator_id: req.user._id,
        workspace_id: req.params.workspace_id,
      };

      const channel = await ChannelService.create(newChannel);

      return res.status(200).json({success: true, message: "Channel Created Successfully !", channel});

    } catch (err) {
      errorHandler(res, err);
    }
  }


  delete = async (req, res) => {

    try {
      const channel = await ChannelService.deleteById(req.params.channel_id);

      return res.status(200).json({success: true, message: "Channel Deleted Successfully !", channel});
      
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
        channel_type: req.body.channel_type,
      };

      const channel = await ChannelService.update(req.params.channel_id, body);

      return res.status(200).json({success: true, message: "Channel Updated Successfully !", channel});
      
    } catch (err) {
      errorHandler(res, err);
    }
  }
}

export default new ChannelController;