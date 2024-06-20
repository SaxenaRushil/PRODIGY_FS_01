
"use client"
import React, { useState } from 'react';
import { signIn } from 'next-auth/react'; 

type Props = {};

const LoginPage = (props: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    
    setError('');

    try {
      // Send credentials to your API route
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Use signIn from next-auth to handle the session and redirect
        const result = await signIn('credentials', {
          redirect: false, // Do not redirect here, handle manually
          email,
          password,
        });

        if (result.error) {
          setError(result.error);
        } else {
          // Redirect to dashboard page upon successful login
          window.location.href = '/Dashboard';
        }
      } else {
        setError(data.error); // Set the error message
        console.error('Login error:', data.error);
      }
    } catch (error) {
      console.error('Login error:', error.message);
      setError('Failed to log in. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-slate-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-200">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-200">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
              required
            />
          </div>
          {error && <div className="text-red-600 mt-2">{error}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
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
          Login with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
