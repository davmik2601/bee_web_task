import UserController from "../api/v1/controllers/UserController.js";
import auth from '../api/v1/middlewares/auth.js';
import upload from "../api/v1/middlewares/upload.js";
import userUpdateValidator from "../api/v1/validators/userUpdateValidator.js";

const routes = [
  {
    prefix: 'workspace/:workspace_id/user',
    path: '/edit',
    method: 'post',
    action: UserController.update,
    validators: [userUpdateValidator],
    middlewares: [auth],
  },
  {
    prefix: 'workspace/:workspace_id/user',
    path: '/avatar',
    method: 'post',
    action: UserController.updateAvatar,
    middlewares: [auth, upload.single("avatar")],
  },
  {
    prefix: 'workspace/:workspace_id/user_profile',
    path: '/:user_id',
    method: 'get',
    action: UserController.getUserData,
    middlewares: [auth],
  },
  
];

export default routes;