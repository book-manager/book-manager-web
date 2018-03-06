import axios from 'axios';

const state = {
  authors: []
};

const getters = {

};

const actions = {
  fetchAuthors (store) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/authors', {
        headers: {
          'Authorization': `Bearer: ${store.getters.token}`
        }
      }).then((response) => {
        console.log(response);
      })
    });
  }
}
export default {
  state,
  getters,
  actions
};
