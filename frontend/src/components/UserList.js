import React from 'react';
import api from '../services/api';

export default function UserList({users, onEdit, onDeleted, token}){

  async function remove(id){
    if(!confirm('Delete user?')) return;
    await api.deleteUser(id, token);
    onDeleted();
  }

  return (
    <div>
      <h3>Users</h3>
      <table border="1" cellPadding="6" style={{borderCollapse:'collapse'}}>
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={()=>onEdit(u)}>Edit</button>
                <button onClick={()=>remove(u.id)} style={{marginLeft:8}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
