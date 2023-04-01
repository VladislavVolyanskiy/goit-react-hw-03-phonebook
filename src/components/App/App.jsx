import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';
import { ContactForm } from '../ContactForm/ContactForm';

import styles from './app.module.css';

export class App extends Component {
  state = {
    contacts: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  setContactFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = id => {
    return this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };

  checkNameIsDoubled = name =>
    this.state.contacts.find(contact => contact.name.toLowerCase() === name);

  addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    const normalizedName = newContact.name.toLowerCase();

    if (this.checkNameIsDoubled(normalizedName)) {
      return alert(`${name} is already in contacts.`);
    }

    this.setState(({ contacts }) => ({ contacts: [newContact, ...contacts] }));
  };

  render() {
    const filteredContacts = this.getFilteredContacts();
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <h2 className={styles.subTitle}>Contacts</h2>

        <Filter value={this.state.filter} onChange={this.setContactFilter} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
