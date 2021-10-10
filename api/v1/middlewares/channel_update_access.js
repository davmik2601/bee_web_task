import ChannelService from "../services/ChannelService.js";

export default async function channelUpdateAccess(req, res, next) {

  const channel = await ChannelService.findById(req.params.channel_id);

  if(!channel) {
    return res.status(400).json({success: false, message: "channel_id parameter does not exist or wrong"});
  }
  
  if(channel.creator_id.toString() !== req.user.id) {
    return res.status(400).json({success: false, message: "You are not access to update this channel"});
  }

  next();
};