import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast('Logged out successfully!', 'info');
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 shadow-md bg-gradient-to-r from-blue-500 to-purple-600">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold text-white">Simple CRUD App</div>

        {/* Hamburger button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <div className="items-center hidden space-x-6 md:flex">
          <Link to="/dashboard" className="text-lg font-semibold text-white transition hover:text-blue-200">Dashboard</Link>
          <Link to="/profile" className="text-lg font-semibold text-white transition hover:text-blue-200">Profile</Link>

          {user && <span className="text-green-200">Welcome, <strong>{user.name}</strong></span>}

          {user ? (
            <button
              onClick={handleLogout}
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-red-300 dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Logout
            </span>
            </button>
          ) : (
            <Link to="/login" className="">Login</Link>
          )}
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="px-6 pb-4 space-y-3 md:hidden">
          <Link to="/dashboard" onClick={() => setIsOpen(false)} className="block font-semibold text-white">Dashboard</Link>
          <Link to="/profile" onClick={() => setIsOpen(false)} className="block font-semibold text-white">Profile</Link>

          {user && <div className="text-green-200">Welcome, <strong>{user.name}</strong></div>}

          {user ? (
            <button
              onClick={() => { handleLogout(); setIsOpen(false); }}
              className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
            >
              <span class="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-red-300 dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
              Logout
              </span>
            </button>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)} className="block font-semibold text-white">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}
