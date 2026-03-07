import UserItem from '../components/UserItem';
import { useParams } from 'react-router';
import {useEffect, useState} from 'react';

function User() {
  const { userId } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);
        const data = await response.json();

        if(!response.ok) {
          throw new Error(data.message || 'Failed to fetch users');
        }

        setUsers(data.user);
        setLoading(false);
        
      } catch (error) {
        setLoading(false);
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []); 

  return (
    <div>
      <h1>Users Page</h1>
      {loading && <p>Loading system data...</p>}
      {!loading && users && <UserItem {...users} />}
    </div>
  );
} 

export default User;