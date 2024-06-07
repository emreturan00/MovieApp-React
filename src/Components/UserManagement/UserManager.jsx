import React, { useState } from 'react';
import './UserManagement.css'; // Ensure this matches the CSS file name
import { Link } from 'react-router-dom';

const UserManager = () => {
  const [accounts, setAccounts] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' }
  ]);
  const [editingAccount, setEditingAccount] = useState(null);
  const [editingUser, setEditingUser] = useState(null);

  const handleAccountAdd = (event) => {
    event.preventDefault();
    const { name, role } = event.target;
    if (name.value && role.value) {
      if (editingAccount) {
        const updatedAccounts = accounts.map(account => 
          account.id === editingAccount.id 
            ? { ...account, name: name.value, role: role.value } 
            : account
        );
        setAccounts(updatedAccounts);
        setEditingAccount(null);
      } else {
        const newAccount = {
          id: accounts.length + 1,
          name: name.value,
          role: role.value
        };
        setAccounts([...accounts, newAccount]);
      }
      event.target.reset(); // Clear the form after submission
    }
  };

  const handleUserAdd = (event) => {
    event.preventDefault();
    const { name, email } = event.target;
    if (name.value && email.value) {
      if (editingUser) {
        const updatedUsers = users.map(user =>
          user.id === editingUser.id
            ? { ...user, name: name.value, email: email.value }
            : user
        );
        setUsers(updatedUsers);
        setEditingUser(null);
      } else {
        const newUser = {
          id: users.length + 1,
          name: name.value,
          email: email.value
        };
        setUsers([...users, newUser]);
      }
      event.target.reset(); // Clear the form after submission
    }
  };

  const handleAccountDelete = (id) => {
    setAccounts(accounts.filter(account => account.id !== id));
  };

  const handleUserDelete = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const handleSelectUser = (user) => {
    setEditingUser(user);
  };

  const handleSelectAccount = (account) => {
    setEditingAccount(account);
  };

  return (
    <div>
      
      <h2 className="user-management-management">USER MANAGEMENT</h2>
      <div className="nav-buttons-management">
      <Link to="/Admin" className="nav-button-management">DASHBOARD</Link>
      <Link to="/FilmForm" className="nav-button-management">FILM ADD/DELETE</Link>
      <Link to="/saloon-operation" className="nav-button-management">SEANS/SALOON EDITION</Link>
      <Link to="/UserManagement" className="nav-button-management">USER MANAGEMENT</Link>
      <Link to="/" className="nav-button-management">LOG OUT</Link>
      </div>

      {/* Main section for Accounts and Users */}
      <div className="main-section-management">
        {/* Accounts section */}
        <div className="section-accounts-management gradient-background-management">
          <h3>Accounts</h3>
          <form onSubmit={handleAccountAdd}>
            <input 
              name="name" 
              type="text" 
              placeholder="Enter account name" 
              defaultValue={editingAccount ? editingAccount.name : ''} 
              required 
            />
            <select name="role" defaultValue={editingAccount ? editingAccount.role : ''} required>
              <option value="">Select role</option>
              <option value="Employee">Employee</option>
              {/* Removed the "User" option */}
            </select>
            <button type="submit">{editingAccount ? 'Save Changes' : 'Add Account'}</button>
          </form>
          {accounts.map((account) => (
            <div key={account.id}>
              <p>{account.name} - {account.role}</p>
              <button onClick={() => handleSelectAccount(account)}>Edit</button>
              <button onClick={() => handleAccountDelete(account.id)}>Delete</button>
            </div>
          ))}
        </div>

        {/* Users section */}
        <div className="section-users-management gradient-background-management">
          <h3>{editingUser ? 'Edit User' : 'Users'}</h3>
          <form onSubmit={handleUserAdd}>
            <input 
              name="name" 
              type="text" 
              placeholder="Enter user name" 
              defaultValue={editingUser ? editingUser.name : ''} 
              required 
            />
            <input 
              name="email" 
              type="email" 
              placeholder="Enter user email" 
              defaultValue={editingUser ? editingUser.email : ''} 
              required 
            />
            <button type="submit">{editingUser ? 'Save Changes' : 'Add User'}</button>
          </form>
          {users.map((user) => (
            <div key={user.id}>
              <p>{user.name} - {user.email}</p>
              <button onClick={() => handleSelectUser(user)}>Edit</button>
              <button onClick={() => handleUserDelete(user.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManager;