import React, {useState, useEffect} from 'react';
import Login from './components/Login';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import api from './services/api';

export default function App(){
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(()=>{
    fetchUsers();
  }, [token]);

  async function fetchUsers(){
    try{
      const data = token ? await api.adminUsers(token) : await api.listUsers();
      setUsers(data);
    }catch(err){
      console.error(err);
      setUsers([]);
    }
  }

  return (
    <div style={{padding:20,fontFamily:'Arial'}}>
      <h2>Laravel File CRUD (React)</h2>
      <Login onLogin={(t)=>{ setToken(t); localStorage.setItem('adminToken', t); }} onLogout={()=>{ setToken(null); localStorage.removeItem('adminToken'); }} token={token} />
      <hr />
      <UserForm onSaved={() => fetchUsers()} editing={editing} setEditing={setEditing} token={token} />
      <hr />
      <UserList users={users} onEdit={(u)=>setEditing(u)} onDeleted={() => fetchUsers()} token={token} />
    </div>
  );
}
