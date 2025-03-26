import { randomUUID } from 'crypto';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
}

class Database {
  private contacts: Contact[] = [
    //default values to imitate data already being in db
    {
      id: '1',
      firstName: 'Bob',
      lastName: 'Dylan',
      email: 'bob.dylan@gmail.com',
      phoneNumber: '1',
      age: 23,
    },
    {
      id: '2',
      firstName: 'Bob',
      lastName: 'Dylan',
      email: 'bob.dylan@gmail.com',
      phoneNumber: '1',
      age: 23,
    },
    {
      id: '3',
      firstName: 'Bob',
      lastName: 'Dylan',
      email: 'bob.dylan@gmail.com',
      phoneNumber: '1',
      age: 23,
    },
    {
      id: '4',
      firstName: 'Bob',
      lastName: 'Dylan',
      email: 'bob.dylan@gmail.com',
      phoneNumber: '1',
      age: 23,
    },
    {
      id: '5',
      firstName: 'Bob',
      lastName: 'Dylan',
      email: 'bob.dylan@gmail.com',
      phoneNumber: '1',
      age: 23,
    },
    {
      id: '6',
      firstName: 'Bob',
      lastName: 'Dylan',
      email: 'bob.dylan@gmail.com',
      phoneNumber: '1',
      age: 23,
    },
  ];

  getAll() {
    return this.contacts;
  }

  create(contact: Omit<Contact, 'id'>) {
    const newContact = { ...contact, id: randomUUID() };
    this.contacts.push(newContact);
    return newContact;
  }

  update(id: string, updatedContact: Omit<Contact, 'id'>) {
    const index = this.contacts.findIndex((x) => x.id === id);
    if (index === -1) throw new Error('Contact not found');
    this.contacts[index] = { ...updatedContact, id };
    return this.contacts[index];
  }

  delete(id: string) {
    this.contacts = this.contacts.filter((x) => x.id !== id);
  }
}

export const db = new Database();
