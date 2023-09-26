import React, { useState } from 'react';

function GuestListApp() {
  const [guests, setGuests] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  //
  const response = await fetch(`${baseUrl}/guests`);
  const allGuests = await response.json();
  const response = await fetch(`${baseUrl}/guests/:id`);
const guest = await response.json();
const response = await fetch(`${baseUrl}/guests`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ firstName: 'Karl', lastName: 'Horky' }),
});
const createdGuest = await response.json();
const response = await fetch(`${baseUrl}/guests/1`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ attending: true }),
});
const updatedGuest = await response.json();
const response = await fetch(`${baseUrl}/guests/1`, { method: 'DELETE' });
const deletedGuest = await response.json();

  //

  const addGuest = () => {
    if (firstName.trim() !== '' && lastName.trim() !== '') {
      const newGuest = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        attending: false,
      };

      setGuests([...guests, newGuest]);
      setFirstName('');
      setLastName('');
    }
  };

  const toggleAttending = (index) => {
    const updatedGuests = [...guests];
    updatedGuests[index].attending = !updatedGuests[index].attending;
    setGuests(updatedGuests);
  };

  const removeGuest = (index) => {
    const updatedGuests = [...guests];
    updatedGuests.splice(index, 1);
    setGuests(updatedGuests);
  };

  return (
    <div>
      <h1>Guest List</h1>
      <div>
        <label htmlFor="firstName">First name</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addGuest();
            }
          }}
        />
        <label htmlFor="lastName">Last name</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addGuest();
            }
          }}
        />
        <button onClick={addGuest}>Add Guest</button>
      </div>
      <ul>
        {guests.map((guest, index) => (
          <div data-test-id="guest" key={index}>
            <li>
              {guest.firstName} {guest.lastName}
              <input
                type="checkbox"
                aria-label={`${guest.firstName} ${guest.lastName} Attending status`}
                checked={guest.attending}
                onChange={() => toggleAttending(index)}
              />
              <button
                aria-label={`Remove ${guest.firstName} ${guest.lastName}`}
                onClick={() => removeGuest(index)}
              >
                Remove
              </button>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default GuestListApp;
