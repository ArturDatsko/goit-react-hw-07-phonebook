import { nanoid } from 'nanoid';
import { StyledList, StyledButton } from './ContactList.styled';
import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'api/contacts-api';
import { selectContacts, selectFilters } from '../../redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(selectContacts);
  const filter = useSelector(selectFilters);
  const dispatch = useDispatch();

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <StyledList>
      {filteredContacts.map(item => (
        <li key={nanoid()}>
          {item.name}: {item.number}{' '}
          <StyledButton
            type="button"
            onClick={() => {
              dispatch(deleteContact(item.id));
            }}
          >
            Delete
          </StyledButton>
        </li>
      ))}
    </StyledList>
  );
};
