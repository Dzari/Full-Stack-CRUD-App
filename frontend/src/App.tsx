import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';
import { Box, Container, Grid2 as Grid, Typography } from '@mui/material';
import EditContactModal from './EditContactModal';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
}

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const fetchContacts = async () => {
    const response = await fetch('dev/contacts');
    const data = await response.json();
    setContacts(data);
  };

  const handleDelete = async (id: string) => {
    await fetch(`dev/contacts/${id}`, { method: 'DELETE' });
    fetchContacts();
  };

  const handleUpdate = (id: string) => {
    const contactToEdit = contacts.find((contact) => contact.id === id);
    if (contactToEdit) {
      setSelectedContact(contactToEdit);
      setIsModalOpen(true);
    }
  };

  const handleSaveContact = () => {
    fetchContacts();
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <Box>
      <Typography variant="h3" align="center" sx={{ mb: 4 }}>
        Contact Manager
      </Typography>
      <Container maxWidth="sm" sx={{ mb: 4 }}>
        <ContactForm onFormSubmit={fetchContacts} />
      </Container>
      <Container maxWidth="lg" sx={{ mb: 3 }}>
        <Grid container spacing={3}>
          {contacts.map((contact) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={contact.id}>
              <ContactList
                contacts={[contact]}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <EditContactModal
        open={isModalOpen}
        contact={selectedContact}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveContact}
      />
    </Box>
  );
};

export default App;
