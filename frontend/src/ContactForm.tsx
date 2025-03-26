import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { createContact } from './utils/api';
import { ContactFormInput } from './utils/types';

interface ContactFormProps {
  onFormSubmit: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onFormSubmit }) => {
  const [contact, setContact] = useState<ContactFormInput>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    age: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createContact(contact)
      .then(() => {
        onFormSubmit();
        setContact({
          firstName: '',
          lastName: '',
          email: '',
          phoneNumber: '',
          age: '',
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <TextField
          label="First Name"
          name="firstName"
          type="text"
          value={contact.firstName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Last Name"
          name="lastName"
          type="text"
          value={contact.lastName}
          onChange={handleChange}
          required
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={contact.email}
          onChange={handleChange}
          required
        />
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={contact.phoneNumber}
          onChange={handleChange}
          required
        />
        <TextField
          label="Age"
          name="age"
          type="number"
          value={contact.age}
          onChange={handleChange}
          required
        />

        <Button type="submit" variant="contained" color="primary">
          Add Contact
        </Button>
      </Stack>
    </form>
  );
};

export default ContactForm;
