const API_ROOT = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000/api';

async function request(path, options={}){
  const res = await fetch(API_ROOT + path, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || res.statusText);
  }
  return res.json().catch(()=>null);
}

export default {
  listUsers: () => request('/users'),
  getUser: (id) => request('/users/' + id),
  createUser: (data) => request('/users', {method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(data)}),
  updateUser: (id,data, token) => request('/users/'+id, {method:'PUT', headers: Object.assign({'Content-Type':'application/json'}, token ? {'Authorization':'Bearer '+token} : {}), body: JSON.stringify(data)}),
  deleteUser: (id, token) => request('/users/'+id, {method:'DELETE', headers: token ? {'Authorization':'Bearer '+token} : {}}),
  adminLogin: (creds) => request('/admin/login', {method:'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(creds)}),
  adminUsers: (token) => request('/admin/users', {headers: {'Authorization':'Bearer '+token}}),
};
