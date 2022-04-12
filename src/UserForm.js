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
        value={email}
        placeholder="email"
        className="input"
        onChange={(event) => {
          setEmail(event.target.value);
        }}
      />
      <br />
      <input
        name="name"
        value={name}
        placeholder="what is your name?"
        className="input"
        onChange={(event) => {
          setName(event.target.value);
        }}
      />
      <br />
      <button className='submit-btn' type="submit">Create User</button>
    </form>
  );
}
