import React, { useState } from 'react';
import { TextField, Button, Stack } from '@mui/material';

interface ContactFormProps {
  onFormSubmit: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onFormSubmit }) => {
  const [contact, setContact] = useState({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await fetch('dev/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...contact, age: Number(contact.age) }),
    });

    onFormSubmit();
    setContact({
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      age: '',
    });
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
