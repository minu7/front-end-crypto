// @flow
import Request from './Request';
import Router from './Router';
import {
  setToken,
  getToken,
  logout,
} from './Cookie';
import config from '../config.json';

export default {
  Request,
  Router,
  setToken,
  getToken,
  logout,
  baseUrl: config.url,
};
