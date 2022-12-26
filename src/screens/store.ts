import {configureStore} from '@reduxjs/toolkit';
import userReducer  from './auth/auth';
import productsReducer from './privates/productsSlice';

export default configureStore({
  reducer: {
     user: userReducer,
     products: productsReducer
  },
});
