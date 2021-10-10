import ChannelController from "../api/v1/controllers/ChannelController.js";
import auth from '../api/v1/middlewares/auth.js';
import channelCreateAccess from "../api/v1/middlewares/channel_create_access.js";
import channelDeleteAccess from "../api/v1/middlewares/channel_delete_access.js";
import channelUpdateAccess from "../api/v1/middlewares/channel_update_access.js";
import channelValidator from "../api/v1/validators/channelValidator.js";

const routes = [
  {
    prefix: 'workspace/:workspace_id/channel',
    path: '/',
    method: 'post',
    action: ChannelController.create,
    validators: [channelValidator],
    middlewares: [auth, channelCreateAccess],
  },
  {
    prefix: 'workspace/:workspace_id/channel',
    path: '/:channel_id',
    method: 'delete',
    action: ChannelController.delete,
    middlewares: [auth, channelDeleteAccess],
  },
  {
    prefix: 'workspace/:workspace_id/channel',
    path: '/:channel_id',
    method: 'patch',
    action: ChannelController.update,
    validators: [channelValidator],
    middlewares: [auth, channelUpdateAccess],
  },
  
];

export default routes;