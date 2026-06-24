import React, {useState} from 'react';
import api from '../services/api';

export default function Login({onLogin, onLogout, token}){
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');

  async function submit(e){
    e.preventDefault();
    try{
      const res = await api.adminLogin({email,password});
      onLogin(res.token);
      setError('');
    }catch(err){
      setError('Invalid credentials');
    }
  }

  if (token) return (
    <div>
      <b>Admin:</b> logged in
      <button style={{marginLeft:10}} onClick={()=>onLogout()}>Logout</button>
    </div>
  );

  return (
    <form onSubmit={submit} style={{marginBottom:10}}>
      <div>
        <label>Email: </label>
        <input value={email} onChange={e=>setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password: </label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
      </div>
      <button type="submit">Admin Login</button>
      <div style={{color:'red'}}>{error}</div>
    </form>
  );
}
