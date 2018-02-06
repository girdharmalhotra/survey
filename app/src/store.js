'use strict';
import { createStore, applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import logger from 'redux-logger';
import reducers from 'reducers';
import axios from 'axios';

// Axios HTTP client
const axiosClient = axios.create({
  baseURL:'http://localhost:5000',
  responseType: 'json'
});

// Define Axios Redux Middleware
const apiMiddleware = axiosMiddleware( axiosClient );

// APPLY MIDDLEWARE
const middleware = applyMiddleware(logger, apiMiddleware);

// CREATE THE STORE
export const store = createStore(reducers, middleware);
