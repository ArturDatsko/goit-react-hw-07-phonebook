import { Formik } from 'formik';
import * as Yup from 'yup';
import {
  StyledForm,
  StyledLabel,
  StyledButton,
  StyledField,
  StyledErrorMessage,
} from './ContactForm.styled';
import { addContact } from '../../api/contacts-api';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/selectors';

const phonebookSchema = Yup.object().shape({
  name: Yup.string().required('This field is required!'),
  number: Yup.string()
    .matches(/^[0-9-+]+$/, 'Please enter digits, "-" or "+"')
    .required('This field is required!'),
});

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === values.name.toLowerCase()
      )
    ) {
      return alert(`${values.name} is already in contacts!`);
    }
    dispatch(addContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{ name: '', number: '' }}
      validationSchema={phonebookSchema}
      onSubmit={handleSubmit}
    >
      <StyledForm>
        <StyledLabel>
          Name
          <StyledField name="name" />
          <StyledErrorMessage name="name" component="div" />
        </StyledLabel>
        <StyledLabel>
          Number
          <StyledField name="number" />
          <StyledErrorMessage name="number" component="div" />
        </StyledLabel>
        <StyledButton type="submit">Add contact</StyledButton>
      </StyledForm>
    </Formik>
  );
};
