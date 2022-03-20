export default function UsersList({ loading, error, data, onSetUpdate, onDelete }) {
    return (
      <>
        {loading && <p>Loading....</p>}
        {error && <>Error {error.message}</>}
        {data &&
          data.users.length > 0 &&
          data.users.map((user) => (
            <div className="user-card" key={user.id}>
              <button onClick={() => onSetUpdate({ ...user })}>edit</button>
              <button onClick={() => onDelete(user.id)}>Delete</button>
              <p>Name: {user.name}</p>
              <p>Email: {user.email}</p>
            </div>
          ))}
  
        {!loading && !data?.users?.length && <h3>No User In Record Yet</h3>}
      </>
    );
  }
  