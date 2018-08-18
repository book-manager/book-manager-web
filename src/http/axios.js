import axios from 'axios';

export default (token, store) => {
  let instance = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
      Authorization: `Bearer: ${token}`
    }
  });

  instance.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      let error = err.response;
      if (error.status === 401) {
        // TODO: Redirect to login page with a message
        store.dispatch('logout');
      }
      throw err;
    });
  });

  return instance;
};
