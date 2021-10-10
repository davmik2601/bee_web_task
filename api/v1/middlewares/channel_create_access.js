

export default async function channelCreateAccess(req, res, next) {
  
  const workspace_id = req.user.workspaces.find(wksp => wksp._id.toString() === req.params.workspace_id);

  if(!workspace_id) {
    return res.status(400).json({success: false, message: "workspace_id parameter does not exist or wrong, or You are not access to create channel in this workspace"});
  }
  next();
};