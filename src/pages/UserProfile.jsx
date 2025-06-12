import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';

export default function UserProfile() {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const toast = useToast();

  const handleChangePassword = (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const currentUser = users.find(u => u.email === user.email);

    if (!currentUser) {
      toast('User not found.', 'error');
      return;
    }

    if (currentUser.password !== oldPassword) {
      toast('Old password is incorrect.', 'error');
      return;
    }

    currentUser.password = newPassword;
    const updatedUsers = users.map(u => u.email === currentUser.email ? currentUser : u);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    const updatedUser = { ...user, password: newPassword };
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    toast('Password changed successfully!', 'success');
    setOldPassword('');
    setNewPassword('');
  };

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold">No user found.</h2>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10 bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="w-full max-w-md p-8 bg-white shadow-xl sm:p-10 rounded-xl">
        <h2 className="mb-8 text-3xl font-bold text-center text-gray-800">My Profile</h2>

        <div className="mb-10">
          <div className="mb-4">
            <label className="block mb-1 text-sm font-medium text-gray-600">Name</label>
            <div className="p-3 text-gray-700 bg-gray-100 rounded">{user.name}</div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-600">Email</label>
            <div className="p-3 text-gray-700 bg-gray-100 rounded">{user.email}</div>
          </div>
        </div>

        <h3 className="mb-4 text-xl font-semibold text-gray-800">Change Password</h3>
        <form onSubmit={handleChangePassword} className="space-y-5">
          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Old Password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 font-semibold text-white transition duration-300 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}
