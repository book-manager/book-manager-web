import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import Login from '@/components/pages/Login';
import Register from '@/components/pages/Register';
import Welcome from '@/components/pages/Welcome';
import Home from '@/components/pages/Home';
import Profile from '@/components/pages/Profile';

import Authors from '@/components/pages/author/Authors';
import AuthorForm from '@/components/pages/author/NewAuthor';
// import AuthorDetails from '@/components/pages/author/AuthorDetails';

// import Books from '@/components/pages/book/Books';
// import BooksForm from '@/components/pages/book/BookForm';

import FriendsSearch from '@/components/pages/friend/FriendsSearch';

Vue.use(Router);

const router = new Router({
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: { auth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      meta: { auth: true },
    },
    {
      path: '/author',
      name: 'authors',
      component: Authors,
      meta: {auth: true}
    },
    // {
    //   path: '/author/:id',
    //   name: 'AuthorDetails',
    //   component: AuthorDetails,
    //   meta: { auth: true }
    // },
    // {
    //   path: '/books',
    //   name: 'books',
    //   component: Books,
    //   meta: { auth: true }
    // },
    // {
    //   path: '/books/new',
    //   name: 'booksNew',
    //   component: BooksForm,
    //   meta: { auth: true }
    // },
    {
      path: '/author/new',
      name: 'authorNew',
      component: AuthorForm,
      meta: { auth: true }
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: Welcome,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/friends/search',
      name: 'FriendsSearch',
      component: FriendsSearch,
      meta: { auth: true }
    }
  ]
});
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!store.getters.isLogged) {
      next({
        path: '/welcome',
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
