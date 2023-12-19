import {
  selectFilters,
  selectContacts,
  selectIsLoading,
  selectError,
} from '../redux/selectors';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { StyledTitle } from './Filter/Filter.styled';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts } from '../api/contacts-api';

export const App = () => {
  const filter = useSelector(selectFilters);
  const contacts = useSelector(selectContacts);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h2>Phonebook</h2>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
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
      {filteredContacts.length ? (
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
