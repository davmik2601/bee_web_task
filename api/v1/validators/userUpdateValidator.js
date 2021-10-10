import { check } from "express-validator";
import UserService from "../services/UserService.js";


const userUpdateValidator = [

  check('fullName')
    // .exists().bail()
    .isLength({min:2, max:50})
      .withMessage('fullName Must be 2-50 characters').bail()
    .matches("^[a-zA-Z ]*$")
      .withMessage('fullName Must be Only letters and spaces'),

  check('phone')
    // .exists().bail()
    .isLength({max:15})
      .withMessage('phone Must be under to 15 characters').bail(),

  check('status')
    // .exists().bail()
    .isLength({max:200})
      .withMessage('Status Must be 2-100 characters').bail(),
  
  check('displayName')
    // .exists().bail()
    .isLength({max:46})
      .withMessage('displayName Must be under to 46 characters').bail(),
];

export default userUpdateValidator;