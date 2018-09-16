import config from '../config';

import API from '@/http/axios';

export default {
  async login (store, email, password) {
    const loginResponse = await API(store).post(config.API.LOGIN, { email, password });
    return {
      token: loginResponse.data.token,
      user: {
        name: loginResponse.data.user.name,
        surname: loginResponse.data.user.surname,
        email: loginResponse.data.user.email,
        id: loginResponse.data.user.id
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
