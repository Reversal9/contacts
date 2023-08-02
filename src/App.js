import './App.css';
import {useState} from 'react';

function App() {
    const [id, setId] = useState(0);

    const initialList = [
        {id: -10, firstName: "Jeremy", lastName: "Wang", email: "jeremywang08@gmail.com", phoneNumber: "1234567890",
            // birthday: {year: "1982", month: "May", day: "24"},
            birthday: "1982-05-24",
            address: {street: "254 Banana Street", city: "Sugar Town", state: "Arkansas", zip: "12345", country: "United States"}},
        {id: -11, firstName: "Chris", lastName: "Zhang", email: "ChrisZhangForTheWin@yahoo.com", phoneNumber: "9876543210",
            // birthday: {year: "2001", month: "February", day: "12"},
            birthday: "2001-02-12",
            address: {street: "312 King Kool Street", city: "New Highlands", state: "Washington", zip: "54321", country: "United Kingdom"}},
    ];
    const [contacts, setContacts] = useState(initialList);
    const [selectedContact, setSelectedContact] = useState(null);

    let date = new Date();
    let todaysDate = date.toLocaleString("ja-JP", {dateStyle: "short"}).replaceAll("/","-");

    function handleAddButton() {
        const newContact = {
            id: id,
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            birthday: "",
            address: {
                street: "",
                city: "",
                state: "",
                zip: "",
                country: ""
            }
        };
        setContacts([...contacts,
            newContact
        ]);
        setId(id + 1);
        setSelectedContact(newContact);
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
                                    todaysDate = {todaysDate}
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
                            `${contact.firstName ?? ""} ${contact.lastName ?? ""}` : "New Contact"}
                    </button>
                );
            })}
        </ul>
    );
}

function Content({setContacts, selectedContact, setSelectedContact, todaysDate}) {
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

    function handleAddressChange(name, value) {
        setContacts(prevContacts =>
            prevContacts.map(contact => {
                if (contact.id === selectedContact.id) {
                    const nextAddress = {...contact.address, [name]: value}
                    const newContact = {...contact, address: nextAddress};
                    setSelectedContact(newContact);
                    return newContact;
                }

                return contact;
            }));
    }

    function hyphenatedPhoneNumber(number) {
        // const firstThreeChars = number.slice(0, 3);
        // const nextThreeChars = number.slice(3, 6);
        // const restChars = number.slice(6);
        //
        // if (number.length > 6) {
        //     return `${firstThreeChars}-${nextThreeChars}-${restChars}`
        // } else if (number.length > 3) {
        //     return `${firstThreeChars}-${nextThreeChars}`
        // } else {
        //     return `${firstThreeChars}`
        // }

        // May be worked on in future to hyphenate phone numbers automatically

        return number;
    }

    return (
        <div
            className = "details">
                <div
                    className = "details-header">
                {/*    will be an image, can change. if null, then show initials of name */}
                </div>
                <div
                    className = "input-container">
                        <input
                            type = "text"
                            name = "firstName"
                            placeholder = "First name"
                            value = {selectedContact.firstName}
                            onChange = {e => {
                                handleNameChange(e.target.name, e.target.value);
                            }}
                            id = {`i-fN-${selectedContact.id}`}
                        />
                        <input
                            type = "text"
                            name = "lastName"
                            placeholder = "Last name"
                            value = {selectedContact.lastName}
                            onChange = {e => {
                                handleNameChange(e.target.name, e.target.value);
                            }}
                            id = {`i-lN-${selectedContact.id}`}
                        />
                        <input
                            type = "email"
                            name = "email"
                            placeholder = "Email address"
                            value = {selectedContact.email}
                            onChange = {e => {
                                handleNameChange(e.target.name, e.target.value);
                            }}
                            id = {`i-eA-${selectedContact.id}`}
                        />
                </div>
                <div
                    className = "input-separator">
                </div>
                <div
                    className = "input-container">
                        <input
                            type = "number"
                            pattern = "[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            maxLength = "10"
                            name = "phoneNumber"
                            placeholder = "123-456-7890"
                            value = {hyphenatedPhoneNumber(selectedContact.phoneNumber)}
                            onChange = {e => {
                                handleNameChange(e.target.name, e.target.value);
                            }}
                            id = {`i-pN-${selectedContact.id}`}
                        />
                </div>
                <div
                    className = "input-separator">
                </div>
                <div
                    className = "input-container">
                        <div
                            className = "input-container-mini">
                                <p
                                    className = "input-field">
                                    Birthday
                                </p>
                                <input
                                    type = "date"
                                    name = "birthday"
                                    max = {todaysDate}
                                    value = {selectedContact.birthday}
                                    onChange = {e => {
                                        handleNameChange(e.target.name, e.target.value);
                                    }}
                                    id = {`i-bD-${selectedContact.id}`}
                                />
                        </div>
                </div>
                <div
                    className = "input-separator">
                </div>
                <div
                    className = "input-container">
                    <input
                        type = "text"
                        name = "street"
                        placeholder = "Street"
                        value = {selectedContact.address.street}
                        onChange = {e => {
                            handleAddressChange(e.target.name, e.target.value);
                        }}
                        id = {`i-a-sN-${selectedContact.id}`}
                    />
                    <input
                        type = "text"
                        name = "city"
                        placeholder = "City"
                        value = {selectedContact.address.city}
                        onChange = {e => {
                            handleAddressChange(e.target.name, e.target.value);
                        }}
                        id = {`i-a-cN-${selectedContact.id}`}
                    />
                    <div
                        className = "input-container-mini">
                        <input
                            type = "text"
                            name = "state"
                            placeholder = "State"
                            value = {selectedContact.address.state}
                            onChange = {e => {
                                handleAddressChange(e.target.name, e.target.value);
                            }}
                            id = {`i-a-s-${selectedContact.id}`}
                        />
                        <input
                            type = "number"
                            name = "zip"
                            placeholder = "Zip"
                            value = {selectedContact.address.zip}
                            onChange = {e => {
                                handleAddressChange(e.target.name, e.target.value);
                            }}
                            id = {`i-a-zC-${selectedContact.id}`}
                        />
                    </div>
                    <input
                        type = "text"
                        name = "country"
                        placeholder = "Country"
                        value = {selectedContact.address.country}
                        onChange = {e => {
                            handleAddressChange(e.target.name, e.target.value);
                        }}
                        id = {`i-a-c-${selectedContact.id}`}
                    />
                </div>
        </div>
    );
}

export default App;
