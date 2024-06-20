"use client"
// pages/Dashboard.tsx
// pages/Dashboard.tsx
import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';

const Dashboard = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn(); // Redirect to login if not authenticated
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 bg-gray-900 shadow-lg rounded-lg">
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  if (session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 bg-gray-900 shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
          <p className="text-lg">You are logged in as {session.user.email}</p>
        </div>
      </div>
    );
  }

  return null; // Avoid rendering anything if the session is not loaded yet or user is not authenticated
};

export default Dashboard;

