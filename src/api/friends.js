import config from '../config';

import API from '@/http/axios';

export default {
  async search (store, query) {
    const searchResult = await API(store).get(`${config.API.FRIENDS.SEARCH}/${query}`);
    return searchResult;
  },
  async addFriend (store, id) {
    const results = await API(store).post(config.API.FRIENDSHIP.ADD, { friend_id: id });
    return results;
  },
  async checkFriendship (store, id) {
    const result = await API(store).get(`${config.API.FRIENDSHIP.CHECK}/${id}`);
    return result;
  },
  async checkIncoming (store, id) {
    const results = await API(store).get(`${config.API.FRIENDSHIP.INCOMING}/${id}`);
    return results;
  },
  async accept (store, id) {
    const result = await API(store).get(`${config.API.FRIENDSHIP.ACCEPT}/${id}`);
    return result;
  }
};
