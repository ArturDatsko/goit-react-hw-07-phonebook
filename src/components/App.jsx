import { StyledTitle } from './Filter/Filter.styled';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchContacts } from 'api/contacts-api';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';

import {
  selectFilters,
  selectContacts,
  selectIsLoading,
  selectError,
} from '../redux/selectors';

export const App = () => {
  const filter = useSelector(selectFilters);
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm />
      <h2>Contacts</h2>
      {error && (
        <div>
          <b>Error! Please reload the page or try later!</b>
        </div>
      )}
      {isLoading && (
        <div>
          <b>Loading...</b>
        </div>
      )}
      {contacts.length ? (
        <>
          <StyledTitle>Find contacts by name</StyledTitle>
          <ContactList />
        </>
      ) : (
        <StyledTitle>There are no contacts yet!</StyledTitle>
      )}
    </div>
  );
};
