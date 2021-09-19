import { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import shortid from 'shortid';
import { ContactForm } from './Components/ContactForm/ContactForm.jsx';
import { ContactList } from './Components/ContactList/ContactList.jsx';
import { Filter } from './Components/Filter/Filter.jsx';

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('myContacts') ?? []);
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('myContacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = data => {
    const contact = {
      id: shortid.generate(),
      name: data.name,
      number: data.number,
    };

    if (
      contacts.find(
        con => con.name.toLowerCase() === contact.name.toLowerCase(),
      )
    ) {
      toast(`${contact.name} is alresdy in contacts`, {
        icon: '❗❗❗',
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      });
      return;
    } else
      setContacts(
        [...contacts, contact].sort((a, b) => a.name.localeCompare(b.name)),
      );
  };

  const deleteContacs = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const onFilterInputValue = e => setFilter(e.target.value);

  const onFilteredContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />

      <h2>Contacts</h2>
      <Filter value={filter} onFilterInputValue={onFilterInputValue} />
      <ContactList
        contacts={onFilteredContacts()}
        onDeleteContact={deleteContacs}
      />
      <Toaster position="top-right" />
    </div>
  );
};
