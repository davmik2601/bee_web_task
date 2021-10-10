import AuthController from "../api/v1/controllers/AuthController.js";
import registerValidator from "../api/v1/validators/registerValidator.js";

const routes = [
  {
    prefix: 'auth',
    path: '/register',
    method: 'post',
    action: AuthController.register,
    validators: [registerValidator]
  },
  {
    prefix: 'auth',
    path: '/verification/:id/:code',
    method: 'get',
    action: AuthController.verification,
  },
  {
    prefix: 'auth',
    path: '/login',
    method: 'post',
    action: AuthController.login
  },
];

export default routes;