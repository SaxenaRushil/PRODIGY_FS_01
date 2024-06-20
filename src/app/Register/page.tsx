"use client"
import React, { useState } from 'react';

type Props = {};

const RegisterPage = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Clear previous errors
    setEmailError('');
    setPasswordError('');
    setError('');

    // Client-side validation
    let valid = true;

    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email ID');
      valid = false;
    }

    if (password.length < 4) {
      setPasswordError('Password should be 4 letters long');
      valid = false;
    }

    if (!valid) {
      return;
    }

    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.status === 200) {
      window.location.href = '/Login'; 
    } else {
      const errorData = await response.json();
      setError(errorData.error); // Set the error message
      console.error('Registration error:', errorData.error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              required
            />
            {emailError && (
              <div className="text-red-600 mt-2">
                {emailError}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              required
            />
            {passwordError && (
              <div className="text-red-600 mt-2">
                {passwordError}
              </div>
            )}
          </div>
          {error && (
            <div className="text-red-600 mt-2">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 flex items-center justify-between">
          <hr className="flex-grow border-gray-300" />
          <span className="px-3 text-gray-500">-OR-</span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <button
          onClick={() => alert('Google Sign-In functionality to be implemented')}
          className="mt-6 w-full py-2 px-4 bg-red-600 text-white rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default RegisterPage;
