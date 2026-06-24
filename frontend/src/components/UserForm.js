import React, {useState, useEffect} from 'react';
import api from '../services/api';

export default function UserForm({onSaved, editing, setEditing, token}){
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  useEffect(()=>{
    if(editing){
      setName(editing.name || '');
      setEmail(editing.email || '');
      setPassword('');
    } else {
      setName(''); setEmail(''); setPassword('');
    }
  }, [editing]);

  async function submit(e){
    e.preventDefault();
    if (editing) {
      await api.updateUser(editing.id, {name,email,password: password || undefined}, token);
      setEditing(null);
    } else {
      await api.createUser({name,email,password});
    }
    onSaved();
  }

  return (
    <form onSubmit={submit}>
      <h3>{editing ? 'Edit User' : 'Create User'}</h3>
      <div>
        <label>Name: </label>
        <input value={name} onChange={e=>setName(e.target.value)} required />
      </div>
      <div>
        <label>Email: </label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
      </div>
      <div>
        <label>Password: </label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder={editing ? '(leave blank to keep)' : ''} />
      </div>
      <button type="submit">{editing ? 'Save' : 'Create'}</button>
      {editing && <button type="button" onClick={()=>setEditing(null)} style={{marginLeft:8}}>Cancel</button>}
    </form>
  );
}
