import WorkspaceService from "../services/WorkspaceService.js";

export default async function workspaceCreator(req, res, next) {
  
  const workspace = await WorkspaceService.findById(req.params.workspace_id);

  if(!workspace) {
    return res.status(400).json({success: false, message: "workspace_id parameter does not exist or wrong"});
  }
  if(workspace.creator_id != req.user.id) {
    return res.status(400).json({success: false, message: "You don't access to this workspace, as your id is wrong, You aren't workspace creator"});
  }
  next();
};