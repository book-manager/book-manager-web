import config from '../config';

import API from '@/http/axios';

export default {
  async login (store, email, password) {
    const loginResponse = await API(store).post(config.API.LOGIN, { email, password });
    return {
      token: loginResponse.data.data.attributes.token,
      user: {
        name: loginResponse.data.data.attributes.name,
        surname: loginResponse.data.data.attributes.surname,
        email: loginResponse.data.data.attributes.email,
        is_admin: loginResponse.data.data.attributes.is_admin,
        id: loginResponse.data.data.attributes.id
      }
    };
  },
  async register (store, name, surname, email, password, cpassword) {
    return API(store).post(config.API.REGISTER, { name, surname, email, password, cpassword });
  },
  async details (store, id) {
    return API(store).get(`${config.API.USERS.ROOT}/${id}`);
  }
};
