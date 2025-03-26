export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: number;
}

export interface ContactFormInput {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  age: string;
}
