import UserItem from '../components/UserItem';

function UsersList({users}: any) {
    if(users.length === 0) {
        return (
            <div>
                <h1>No users found.</h1>
            </div>
        );
    }
  return (
    <div>
      <h1>Users List</h1>
      {users.map((user: any) => (
        <UserItem key={user.id} id={user.id} name={user.name} email={user.email} image={user.image} />
      ))}
    </div>
  );
}

export default UsersList;