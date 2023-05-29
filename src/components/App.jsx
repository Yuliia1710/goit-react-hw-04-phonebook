import React, { useState, useEffect } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import { Container } from './App.styled';

export function App() {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const handleChangeFilter = e => {
    setFilter(e.currentTarget.value);
  };

  const addContact = newContact => {
    if (checkNameRepeat(newContact.name)) {
      alert(`${newContact.name} is already in contacts!`);
    } else setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = index => {
    setContacts(prevState => {
      return prevState.filter(element => element.id !== index);
    });
  };

  const checkNameRepeat = name => {
    let arrNameToLowerCase = contacts.map(item => item.name.toLowerCase());
    return arrNameToLowerCase.includes(name.toLowerCase());
  };

  const layOutFilteredContact = () => {
    return contacts.filter(item =>
      item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase().trim())
    );
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h1>Contacts</h1>
      <Filter handleChangeFilter={handleChangeFilter} value={filter} />
      <ContactList
        contacts={layOutFilteredContact()}
        deleteContact={deleteContact}
      />
    </Container>
  );
}
