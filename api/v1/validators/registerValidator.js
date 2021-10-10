import { check } from "express-validator";
import UserService from "../services/UserService.js";


const registerValidator = [

  check('fullName')
    .exists().bail()
    // .matches(/^\p{L}+$/u)
      // .withMessage('Last Name Must be only letters').bail()
    .matches("^[a-zA-Z -]*$")
      .withMessage('fullName Must be Only letters and spaces')
    .isLength({min:2, max:50})
      .withMessage('FullName Must be 2-50 characters').bail(),

  check('email')
    .exists().bail()
    .notEmpty()
      .withMessage('Email cannot be empty').bail()
    .isEmail()
      .withMessage('Email is not valid').bail()
    .custom(async val => {
      try {
        const data = await UserService.findByEmail(val);
        if(data) {
          return Promise.reject('This email is also exist');
        }
      } catch (err) {
        console.log(err);
        throw new Error(err);
      }
    }),

  check('password', 'Password must be minimum 6 characters (minimum 1 number)')
    .exists().bail()
    .matches("^(?=.*[A-Za-z])(?=.*[0-9])(?=.{6,})"),
  
  check('confirmPassword', 'Confirm password is not match with password')
    .custom((val, { req }) => val === req.body.password)
];

export default registerValidator;