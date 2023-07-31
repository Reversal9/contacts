import './App.css';
import {useState} from 'react';

function App() {
    const initialList = [
        {id: 0, firstName: "Jeremy", lastName: "Wang"},
        {id: 1, firstName: "Chris", lastName: "Zhang"},
        {id: 2, firstName: "Sam", lastName: "Chan"},
        {id: 3, firstName: "Bob", lastName: "Williams"},
        {id: 4, firstName: "Jeff", lastName: "Getting"}
    ];
    const [contacts, setContacts] = useState(initialList);
    const [selectedContact, setSelectedContact] = useState(null);


    return (
        <div>
            <h1>Contacts</h1>
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
                        <div
                            className = "contact-item">
                                <button
                                    className = {`contact-button ${selectedContact === contact.id ? 'selected' : ''}`}
                                    onClick = {() => {
                                        handleSelectedContact(contact.id);
                                    }}
                                    >
                                        {`${contact.firstName} ${contact.lastName}`}
                                </button>
                        </div>
                    );
                })}
        </ul>
    );
}

export default App;
