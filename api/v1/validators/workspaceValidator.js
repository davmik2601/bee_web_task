import { check } from "express-validator";


const workspaceValidator = [

  check('name')
    .exists().bail()
    .isLength({min:2, max:50})
      .withMessage('Workspace Name Must be 2-50 characters').bail()
    .matches("^[a-zA-Z ]*$")
      .withMessage('Workspace Name Must be Only letters and spaces'),

  check('description')
    .isLength({max:1000})
      .withMessage('Workspace Description Must be under to 1000 characters').bail(),
];

export default workspaceValidator;