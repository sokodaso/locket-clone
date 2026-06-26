import UserItem from '../components/UserItem';
import { useParams } from 'react-router';
import {useEffect, useState, useContext} from 'react';
import './UserPage.css';
import AuthContext from '../../context/Auth-Context';


function UserPage() {
  const { userId } = useParams();
  const authState = useContext(AuthContext);
  const [user, setUsers] = useState<any>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
          headers: {
            'Authorization': `Bearer ${authState.token}`
          }
        });
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
    <div className="users-page">
      <div className = "users-page-header">
        <h1>Users Page</h1>
      </div>
      {loading && <p>Loading system data...</p>}
      {!loading && user && <UserItem {...user} posts={user._count.posts} />}
    </div>
  );
} 

export default UserPage;