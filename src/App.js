import './App.css';
import {useState} from 'react';

function App() {
    const [id, setId] = useState(0);

    const initialList = [
        {id: -10, firstName: "Jeremy", lastName: "Wang"},
        {id: -11, firstName: "Chris", lastName: "Zhang"},
        {id: -12, firstName: "Sam", lastName: "Chan"},
        {id: -13, firstName: "Bob", lastName: "Williams"},
        {id: -14, firstName: "Jeff", lastName: "Getting"}
    ];
    const [contacts, setContacts] = useState(initialList);
    const [selectedContact, setSelectedContact] = useState(null);

    function handleAddButton() {
        setContacts([...contacts, {
            id: id,
            firstName: "",
            lastName: ""
        }])
        setId(id + 1);
    }

    return (
        <div
            className = "app-container">
                <div
                    className = "header">
                        <h1>Contacts</h1>
                        <button
                            className = "add-button"
                            onClick = {() => {
                                handleAddButton();
                            }}>
                            +
                        </button>
                </div>
                <div
                    className = "container">
                        <List
                            contacts = {contacts}
                            selectedContact = {selectedContact} //maybe not needed, keeping for now.
                            setSelectedContact = {setSelectedContact}
                        />
                </div>
        </div>
    );
}

function List({contacts, selectedContact, setSelectedContact}) {
    function handleSelectedContact(contactId) {
        setSelectedContact(contactId);
    }

    return (
        <ul
            className = "contacts-list">
                {contacts.map(contact => {
                    return (
                        <button
                            className = {`contact-button ${selectedContact === contact.id ? 'selected' : ''}`}
                            onClick = {() => {
                                handleSelectedContact(contact.id);
                            }}
                            >
                                {`${contact.firstName} ${contact.lastName}`}
                        </button>
                    );
                })}
        </ul>
    );
}

export default App;
