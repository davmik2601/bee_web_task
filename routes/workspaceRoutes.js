import WorkspaceController from "../api/v1/controllers/WorkspaceController.js";
import auth from '../api/v1/middlewares/auth.js';
import workspaceCreator from "../api/v1/middlewares/workspace_creator.js";
import workspaceValidator from "../api/v1/validators/workspaceValidator.js";


const routes = [
  {
    prefix: 'workspace',
    path: '/',
    method: 'post',
    action: WorkspaceController.create,
    validators: [workspaceValidator],
    middlewares: [auth],
  },
  {
    prefix: 'workspace',
    path: '/:workspace_id',
    method: 'delete',
    action: WorkspaceController.delete,
    middlewares: [auth, workspaceCreator],
  },
  {
    prefix: 'workspace',
    path: '/:workspace_id',
    method: 'patch',
    action: WorkspaceController.update,
    validators: [workspaceValidator],
    middlewares: [auth, workspaceCreator],
  },
  {
    prefix: 'workspace',
    path: '/:workspace_id',
    method: 'get',
    action: WorkspaceController.getWorkspaceData,
    middlewares: [auth],
  },
  
];

export default routes;