import { useSpring, animated } from "react-spring";

export default function UsersList({ loading, error, data, onSetUpdate, onDelete }) {

  const itemUser = useSpring({to: {opacity: 9}, from: {opacity: 0}, delay: 2000});

  return (
      <div >
      <div className="list">
        {loading && <p>Loading....</p>}
        {error && <>Error {error.message}</>}
        {data &&
          data.users.length > 0 &&
          data.users.map((user) => (
            <animated.div style={itemUser} className="user-card" key={user.id}>
              <div className="user">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
              </div>
              <div className="btns">
                <button onClick={() => onSetUpdate({ ...user })}>edit</button>
                <button onClick={() => onDelete(user.id)}>Delete</button>
              </div>
            </animated.div>
          ))}
  
        {!loading && !data?.users?.length && <h3>No User In Record Yet</h3>}
      </div>
      </div>
    );
  }
  