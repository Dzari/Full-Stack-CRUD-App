import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
} from '@mui/material';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
}

interface ContactListProps {
  contacts: Contact[];
  onDelete: (id: string) => void;
  onUpdate: (id: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onDelete,
  onUpdate,
}) => {
  return (
    <Stack sx={{ mt: 3 }} spacing={3}>
      {contacts.map((contact) => (
        <Card key={contact.id} sx={{ padding: 2, position: 'relative' }}>
          <CardContent>
            <Button
              variant="outlined"
              color="secondary"
              sx={{ position: 'absolute', top: 8, right: 8 }}
              onClick={() => onUpdate(contact.id)}
            >
              Edit
            </Button>
            <Typography variant="h6">
              {contact.firstName} {contact.lastName}
            </Typography>
            <Typography>Email: {contact.email}</Typography>
            <Typography>Phone: {contact.phoneNumber}</Typography>
            <Typography>Age: {contact.age}</Typography>

            <Button
              variant="contained"
              color="error"
              sx={{ marginTop: 1 }}
              onClick={() => onDelete(contact.id)}
            >
              Delete
            </Button>
          </CardContent>
        </Card>
      ))}
    </Stack>
  );
};

export default ContactList;
