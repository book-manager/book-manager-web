import axios from 'axios';

export default (store) => {
  let instance = axios.create({
    baseURL: 'http://localhost:4000/',
    headers: {
      Authorization: `Bearer: ${store.getters.token}`
    }
  });

  instance.interceptors.response.use(undefined, function (err) {
    return new Promise(function (resolve, reject) {
      let error = err.response;
      if (error.status === 401) {
        // TODO: Redirect to login page with a message
        store.dispatch('logout');
      } else if (error.status === 500) {
        store.dispatch('showError', { message: error.data.message });
        reject(error.data.message);
      } else if (error.status === 422) {
        store.dispatch('showError', { message: error.data.message });
        reject(error.data.message);
      }
      throw err;
    });
  });

  return instance;
};
