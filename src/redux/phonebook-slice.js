import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import { fetchContacts, addContact, deleteContact } from 'api/contacts-api';

const arrApi = [fetchContacts, addContact, deleteContact];
const arrApiType = type => arrApi.map(api => api[type]);

const handleFulfilled = state => {
  state.isLoading = false;
  state.error = null;
};

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const phonebookSlice = createSlice({
  name: 'phonebook',
  initialState: {
    contacts: [],
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts = action.payload;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts = state.contacts.filter(
          item => item.id !== action.payload.id
        );
      })
      .addMatcher(isAnyOf(...arrApiType('pending')), handlePending)
      .addMatcher(isAnyOf(...arrApiType('rejected')), handleRejected)
      .addMatcher(isAnyOf(...arrApiType('fulfilled')), handleFulfilled);
  },
});

export const phonebookReducer = phonebookSlice.reducer;
