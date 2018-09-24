import config from '../config';

import API from '@/http/axios';

export default {
  async fetchDetails (store, id, owned) {
    if (owned) {
      return API(store).get(`${config.API.AUTHORS.ROOT}/${id}?owned=true`);
    } else {
      return API(store).get(`${config.API.AUTHORS.ROOT}/${id}?owned=false`);
    }
  },
  async owned (store, id) {
    return API(store).get(`${config.API.AUTHOR_OWNERSHIP.ROOT}/${id}`);
  },
  async fetchAuthors (store) {
    return API(store).get(`${config.API.AUTHORS.ROOT}`);
  }
};
