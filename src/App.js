// @ts-check
import { useSpring, animated } from 'react-spring';

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

const DELETE_USER = gql`
mutation DeleteUser($id: String!){
  deleteUser(id: $id){
    message
  }
}
`;

const UPDATE_USER = gql`
mutation UpdateUser($id: String!, $user: UserInput!){
  updateUser(id: $id, user: $user){
    id
  }
}
`

function App() {
  const { loading, error, data } = useQuery(GET_USER_QUERY);
  const [createUser] = useMutation(CREATE_USER_MUTATION);
  const [deleteUser] = useMutation(DELETE_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  const [update, setUpdate] = useState();

  const handleOnSubmit = async (email, name) => {
    if (!update) {
      await createUser({
        variables: { email, name },
        refetchQueries: [GET_USER_QUERY],
      });
    } else {
      // implement update here
      await updateUser({
        variables: {id: update.id, user: {email, name}},
        refetchQueries: [GET_USER_QUERY],
      })
    }

    setUpdate(undefined);
  };

  const onDeleteUser = async (id) => {
   // implement delete here
    await deleteUser({
      variables: { id },
      refetchQueries: [GET_USER_QUERY],
    })
  }

  const title = useSpring({to: {"margin-left": 0}, from: {"margin-left": -5000}, delay: 500})
  const form = useSpring({to: {"margin-left": 0}, from: {"margin-left": 5000}, delay: 600})
  const list = useSpring({to: {"margin-left": 0}, from: {"margin-left": -5000}, delay: 700})


  return (
    <div className="App">
      <header className='header'>
      <animated.div style={title}>
          <h1>Welcome to admin portal</h1>
      </animated.div>
      </header>

      <animated.div style={form}>
      <UserForm 
      handleSubmit={handleOnSubmit} 
      update={update} 
      />
      </animated.div>

      <div style={{height: "5vh"}}></div>
      
      <animated.div style={list}>
      <UsersList
        loading={loading}
        error={error}
        data={data}
        onSetUpdate={setUpdate}
        onDelete={onDeleteUser}
      />
      </animated.div>
    </div>
  );
}

export default App;
