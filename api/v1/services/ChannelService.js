import Channel from '../models/Channel.js';
// import UserService from './UserService.js';

class ChannelService {
  constructor() {  }

  create = async (newChannel) => {
    const channel = new Channel(newChannel);
    if(channel.channel_type === "private") { channel.users.push(channel.creator_id) };
    await channel.save();
    return channel;
  }

  deleteById = async (id, selected = '') => {
    const deletedChannel = await Channel.findByIdAndDelete(id).select(selected);
    return deletedChannel;
  }

  update = async (id, body, selected = '') => {
    const workspace = await Channel.findOneAndUpdate({_id: id}, body, {new: true}).select(selected);
    return workspace;
  }

  findById = async (id, selected = '') => {
    const channel = await Channel.findById(id).select(selected);
    return channel;
  }

  find = async (body, selected = '') => {
    const channel = await Channel.find(body).select(selected);
    return channel;
  }
}

export default new ChannelService;