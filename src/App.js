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
                className = "left-container">
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
                        className = "contact-list">
                            <List
                                contacts = {contacts}
                                selectedContact = {selectedContact}
                                setSelectedContact = {setSelectedContact}
                            />
                    </div>
            </div>
            <div
                className = "right-container">
                    {selectedContact ? (
                        <div
                            className = "content">
                                <Content
                                    setContacts = {setContacts}
                                    selectedContact = {selectedContact}
                                    setSelectedContact = {setSelectedContact}
                                />
                        </div>) : null}
            </div>
        </div>
);
}

function List({contacts, selectedContact, setSelectedContact}) {
    function handleSelectedContact(contactId) {
        setSelectedContact(contacts.find(contact => contact.id === contactId));
    }

    return (
        <ul>
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
                        {(contact.firstName || contact.lastName) ?
                            `${contact.firstName} ${contact.lastName}` : "New Contact"}
                    </button>
                );
            })}
        </ul>
    );
}

function Content({setContacts, selectedContact, setSelectedContact}) {
    function handleNameChange(name, value) {
        setContacts(prevContacts =>
            prevContacts.map(contact => {
                if (contact.id === selectedContact.id) {
                    const newContact = {...contact, [name]: value};
                    setSelectedContact(newContact);
                    return newContact;
                }

                return contact;
        }));
    }

    return (
        <div
            className = "details">
                <div
                    className = "details-header">
                {/*    will be an image */}
                </div>
                <div
                    className = "input-container">
                        <input
                            // className = ""
                            name = "firstName"
                            placeholder = "First name"
                            value = {selectedContact.firstName}
                            onChange = {e => {
                                handleNameChange(e.target.name, e.target.value);
                            }}
                            id = {`i-${selectedContact.id}`}
                        />
                        <input
                            // className = ""
                            name = "lastName"
                            placeholder = "Last name"
                            value = {selectedContact.lastName}
                            onChange = {e => {
                                handleNameChange(e.target.name, e.target.value);
                            }}
                            id = {`i-${selectedContact.id}`}
                        />
                </div>
        </div>
    );
}

export default App;
