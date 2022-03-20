// @ts-check

import { useQuery, gql, useMutation } from '@apollo/client';
import { useState } from 'react';
import UserForm from './UserForm';
import './App.css';
import UsersList from './UserList';

const GET_USER_QUERY = gql`
  query GetUser {
    users {
      email
      name
      id
    }
  }
`;

const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!, $name: String!) {
    createUser(email: $email, name: $name) {
      id
      name
      email
    }
  }
`;


function App() {
  const { loading, error, data } = useQuery(GET_USER_QUERY);
  const [createUser] = useMutation(CREATE_USER_MUTATION);



  const [update, setUpdate] = useState();

  const handleOnSubmit = async (email, name) => {
    if (!update) {
      await createUser({
        variables: { email, name },
        refetchQueries: [GET_USER_QUERY],
      });
    } else {
      // implement update here
    }

    setUpdate(undefined);
  };

  const onDeleteUser = async (id) => {
   // implement delete here
  }

  return (
    <div className="App">
      <header>
        <h1>Welcome to admin portal</h1>
      </header>
      <UserForm handleSubmit={handleOnSubmit} update={update} />
      <UsersList
        loading={loading}
        error={error}
        data={data}
        onSetUpdate={setUpdate}
        onDelete={onDeleteUser}
      />
    </div>
  );
}

export default App;
