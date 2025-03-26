import { Contact, ContactFormInput } from "./types";

const validateFetch = async (res: Response) => {
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  if (res.status === 204) {
    return null;
  }

  return res.json();
};

const getContacts = () => {
  return fetch('dev/contacts').then(validateFetch);
};

const deleteContact = (id: string) => {
  return fetch(`dev/contacts/${id}`, { method: 'DELETE' }).then(validateFetch);
};

const createContact = (contact: ContactFormInput) => {
  return fetch('dev/contacts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...contact, age: Number(contact.age) }),
  });
};

const handleContactUpdate = (contact: Contact) => {
  return fetch(`/dev/contacts/${contact.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact),
  });
};

export { getContacts, deleteContact, handleContactUpdate, createContact };
