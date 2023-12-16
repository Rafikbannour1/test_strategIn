import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './userlist.css';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token'); 

  useEffect(() => {
    
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users', {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        setUsers(response.data); 
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, [token]);

  return (
    <>
      <h2 className="table-title">Utilisateurs</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Nom</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.email}</td>
              <td>{user.fullname}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserList;
