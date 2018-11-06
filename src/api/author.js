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
  },
  async createAuthor (store, form, image) {
    return API(store).post(`${config.API.AUTHORS.ROOT}`, { author: { form: form, image: image } });
  },
  async uploadAuthorAvatar (store, file, filename, authorID) {
    console.log(file);
    return API(store).post(`${config.API.AUTHORS.AVATAR}`, { file: file, name: filename, authorID: authorID });
  }
};
