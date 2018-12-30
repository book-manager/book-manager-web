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
import AuthorDetails from '@/components/pages/author/AuthorDetails';
import AuthorSearch from '@/components/pages/author/AuthorSearch';

import BooksForm from '@/components/pages/book/BookForm';
import BooksDetails from '@/components/pages/book/BookDetails';
import Books from '@/components/pages/book/Books';

import FriendsSearch from '@/components/pages/friend/FriendsSearch';
import FriendsList from '@/components/pages/friend/FriendsList';
import FriendsRequests from '@/components/pages/friend/FriendsRequests';

import UserProfile from '@/components/pages/user/UserProfile';

Vue.use(Router);

const mainRoutes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {auth: true}
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: Welcome
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
];

const authorRoutes = [
  {
    path: '/authors',
    name: 'authors',
    component: Authors,
    meta: {auth: true}
  },
  {
    path: '/author/search',
    name: 'AuthorSearch',
    component: AuthorSearch,
    meta: {auth: true}
  },
  {
    path: '/author/new',
    name: 'authorNew',
    component: AuthorForm,
    meta: {auth: true}
  },
  {
    path: '/author/:id',
    name: 'authorDetails',
    component: AuthorDetails,
    meta: {auth: true}
  }
];

const friendsRoutes = [
  {
    path: '/friends/search',
    name: 'FriendsSearch',
    component: FriendsSearch,
    meta: {auth: true}
  },
  {
    path: '/friends/requests',
    name: 'FriendsRequests',
    component: FriendsRequests,
    meta: { auth: true }
  },
  {
    path: '/friends',
    name: 'FriendList',
    component: FriendsList,
    meta: {auth: true}
  }
];

const userRoutes = [
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    meta: {auth: true}
  },
  {
    path: '/user/:id',
    name: 'UserProfile',
    component: UserProfile,
    meta: {auth: true}
  }
];

const booksRoutes = [
  {
    path: '/books/new',
    name: 'booksNew',
    component: BooksForm,
    meta: {auth: true}
  },
  {
    path: '/books/:id',
    name: 'book',
    component: BooksDetails,
    meta: {auth: true}
  },
  {
    path: '/books',
    name: 'books',
    component: Books,
    meta: { auth: true }
  }
];

function createsRoutes () {
  return [...mainRoutes, ...userRoutes, ...authorRoutes, ...friendsRoutes, ...booksRoutes];
}

const router = new Router({
  linkActiveClass: 'is-active',
  routes: createsRoutes()
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    if (!store.getters.isLogged) {
      next({
        path: '/welcome'
      });
    } else if (to.meta.admin_only) {
      if (store.getters.is_admin) {
        next();
      } else {
        next({
          path: '/'
        });
      }
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
