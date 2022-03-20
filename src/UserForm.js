import { useState, useEffect } from 'react';

export default function UserForm({ handleSubmit, update }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    setName(update?.name || '');
    setEmail(update?.email || '');
  }, [update]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(email, name);
        setName('');
        setEmail('');
      }}
    >
      <input
        name="email"
        placeholder="email"
        className="mb-1"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
        value={email}
      />
      <br />
      <input
        name="name"
        value={name}
        placeholder="what is your name?"
        className="mb-1"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <br />
      <button type="submit">Create User</button>
    </form>
  );
}
