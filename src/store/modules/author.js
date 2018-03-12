import axios from 'axios';
import {
  FETCH_AUTHORS
} from '../mutation-types';

const state = {
  authors: []
};

const getters = {
  authors: state => state.authors
};

const actions = {
  fetchAuthors (store) {
    return new Promise((resolve, reject) => {
      axios.get('http://localhost:3000/author', {
        headers: {
          'Authorization': `Bearer: ${store.getters.token}`
        }
      }).then((response) => {
        console.log(response);
        store.commit(FETCH_AUTHORS, { authors: response.data });
      });
    });
  },
  addAuthor (store, { authorForm }) {
    return new Promise((resolve, reject) => {
      axios.post('http://localhost:3000/author', {
        name: authorForm.name,
        surname: authorForm.surname,
        description: authorForm.description
      }, {
        headers: {
          'Authorization': `Bearer: ${store.getters.token}`
        }
      }).then((response) => {
        console.log(response);
      });
    });
  }
};

const mutations = {
  [FETCH_AUTHORS] (store, { authors }) {
    store.authors = authors;
  }
}
export default {
  state,
  getters,
  actions,
  mutations
};
