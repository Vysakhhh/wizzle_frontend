import React, { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProfileSettings from './pages/ProfileSettings';
import { useAuthStore } from './store/useAuthStore';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

// Admin Pages
import AdminLayout from './pages/AdminLayout';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminGroups from './pages/AdminGroups';
import { useChatStore } from './store/useChatStore';

function App() {
  const { authUser, checkAuth, isCheckingAuth ,socket } = useAuthStore();
    const { getNotifications } = useChatStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
    useEffect(() => {
    if (authUser && socket) {
      getNotifications();
    }
  }, [authUser, socket, getNotifications]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-blue-400" />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <Signup /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/settings" element={authUser ? <ProfileSettings /> : <Navigate to="/login" />} />

      
        {authUser && authUser.role === "admin" && (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="groups" element={<AdminGroups />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
