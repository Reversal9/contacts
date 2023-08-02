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
                            selectedContact = {selectedContact}
                            setSelectedContact = {setSelectedContact}
                        />
                </div>

                {selectedContact ? (
                    <div
                        className = "content">
                            <p>Test</p>
                            <Content
                                selectedContact = {selectedContact}
                                setSelectedContact = {setSelectedContact}
                            />
                    </div>) : null}
        </div>
    );
}

function List({contacts, selectedContact, setSelectedContact}) {
    function handleSelectedContact(contactId) {
        setSelectedContact(contacts.find(contact => contact.id === contactId));
    }

    return (
        <ul
            className = "contacts-list">
                {contacts.map(contact => {
                    return (
                        <button
                            className = {`contact-button ${selectedContact === contact ?
                                'selected' : ''}`}
                            onClick = {() => {
                                handleSelectedContact(contact.id);
                            }}
                            id = {`b-${contact.id}`}
                            >
                            {(contact.firstName && contact.lastName) ?
                                `${contact.firstName} ${contact.lastName}` : "New Contact"}
                        </button>
                    );
                })}
        </ul>
    );
}

function Content({selectedContact, setSelectedContact}) {
    function handleFirstNameChange(newFirstName) {
        setSelectedContact(contact => {
            return {...contact, firstName: newFirstName};
        });
    }

    return (
        <div
            className = "content">
                <input
                    // className = ""
                    value = {selectedContact.firstName}
                    onChange = {e => {
                        handleFirstNameChange(e.target.value);
                    }}
                    id = {`i-${selectedContact.id}`}
                />
        </div>
    );
}

export default App;
