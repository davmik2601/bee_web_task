import { validationResult } from "express-validator";
import bcrypt from 'bcrypt';
import moment from "moment";
import keys from "../../../config/keys.js";
import errorHandler from "../utils/errorHandler.js";
import createAccessToken from "../utils/createAccessToken.js";
import UserService from "../services/UserService.js";
import MailService from "../services/MailService.js";
import jwt from 'jsonwebtoken';

class AuthController {
  constructor() {  }


  register = async(req, res) => {

    try {
      const errorData = validationResult(req).errors;
      let errors = {}
      if(errorData[0]) {
        errorData.forEach(e => {
          errors[e.param] = e.msg;
        });
        return res.status(400).json({success: false, errors: errors});
      };

      const candedate = {
        fullName: req.body.fullName,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        verificationCode: `${moment().format("DD_MM_YYYY_HHmmss_SSS")}__${Math.round(Math.random()*1000*1000)}`,
      };

      const user = await UserService.create(candedate);

      await MailService.sendVerificationMail(user.email, user._id, user.verificationCode);

      return res.status(200).json({success: true, message: "Check Your Email Box For Verification"});

    } catch (err) {
      errorHandler(res, err);
    }
  }


  verification = async (req, res) => {

    try {
      let user = await UserService.findById(req.params.id, "verificationCode");

      if(!user) {
        return res.status(400).json({success: false, message: "UnCorrect Link, User does not exist"});
      }
      if(user.verificationCode != req.params.code) {
        return res.status(400).json({success: false, message: "UnCorrect Link, Verification Code Is Wrong"});
      }
      
      user = await UserService.verify(req.params.id, req.params.code, "-password -verificationCode");
      
      
      return res.status(200).json({success: true, message: "You Are Verified Successfully, Now Please Login", user});

    } catch (err) {
      errorHandler(res, err);
    }
  }


  login = async(req, res) => {
    
    try {
      const candetate = {
        email: req.body.email,
        password: req.body.password,
      };
      let user = await UserService.findByEmail(candetate.email);

      if(!user) {
        return res.status(400).json({success: false, message: "User Does Not Exist."});
      }
      
      if(! await bcrypt.compare(candetate.password, user.password)) {
        return res.status(401).json({success: false, message: "Password Is Wrong."});
      }

      if(user.verification === false) {
        return res.status(401).json({success: false, message: "Before Login Please Verify Your Email"});
      }
      
      user = await UserService.findById(user._id, "-password");

      const token = createAccessToken(keys.USER_ACCESS_TOKEN_SECRET, {
        email: user.email,
        id: user._id,
      });

      return res.status(200).json({success: true, user, token});

    } catch(err) {
      errorHandler(res, err);
    }
  }

}

export default new AuthController;