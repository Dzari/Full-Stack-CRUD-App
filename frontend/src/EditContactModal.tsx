import React, { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import { handleContactUpdate } from './utils/api';
import { Contact } from './utils/types';

interface EditContactModalProps {
  open: boolean;
  contact: Contact;
  onClose: () => void;
}

const EditContactModal: React.FC<EditContactModalProps> = ({
  open,
  contact,
  onClose,
}) => {
  const [formData, setFormData] = useState<Contact>(contact);

  React.useEffect(() => {
    setFormData(contact);
  }, [contact]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formData) return;

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    handleContactUpdate(formData)
      .then(() => onClose())
      .catch((err) => console.log(err));
  };

  if (!formData) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          Edit Contact
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <TextField
              label="Age"
              name="age"
              type="number"
              value={formData.age}
              onChange={handleChange}
              required
            />

            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" color="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save Changes
              </Button>
            </Stack>
          </Stack>
        </form>
      </Box>
    </Modal>
  );
};

export default EditContactModal;
