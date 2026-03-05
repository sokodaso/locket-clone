import UsersList from '../components/UsersList';
import {useState} from 'react';

function Users() {
  const [users, setUsers] = useState([]);

  return (
    <div>
      <h1>Users Page</h1>
      <UsersList users={users} />
    </div>
  );
} 

export default Users;