import { check } from "express-validator";


const channelValidator = [

  check('name')
    .exists().bail()
    .isLength({min:2, max:50})
      .withMessage('Workspace Name Must be 2-50 characters').bail()
    .matches("^[a-zA-Z ]*$")
      .withMessage('Workspace Name Must be Only letters and spaces'),
    
  check('channel_type')
    .exists().bail()
    .isIn(['public', 'private'])
      .withMessage('Incorrect channel_type,  must be public or private'),
];

export default channelValidator;