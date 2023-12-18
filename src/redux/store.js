import { configureStore } from '@reduxjs/toolkit';
import { phonebookReducer } from './phonebook-slice';
import { filterReducer } from './filter-slice';

const store = configureStore({
  reducer: {
    phonebook: phonebookReducer,
    filter: filterReducer,
  },
});

export default store;
