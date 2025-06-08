import React, { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useChatStore } from '../store/useChatStore';
import { useAdminStore } from '../store/useAdminStore';
import { Users, UserCheck, UserX, Layers } from 'lucide-react';
import {LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,} from 'recharts';

function AdminDashboard() {
  const { authUser,onlineUsers } = useAuthStore();
  const { getUsers, users } = useChatStore();
  const { allGroups, getAllGroups } = useAdminStore();

 useEffect(() => {
  if (!authUser || authUser.role !== "admin") return;
  
  getUsers();
  getAllGroups();
}, [authUser, getUsers, getAllGroups]);


  const offlineCount = users.length - onlineUsers.length;

  // Dummy data for chart 
  const data = [
    { day: 'Mon', totalUsers: 5, activeUsers: 3, groups: 2 },
    { day: 'Tue', totalUsers: 5, activeUsers: 4, groups: 3 },
    { day: 'Wed', totalUsers: 5, activeUsers: 3, groups: 4 },
    { day: 'Thu', totalUsers: 6, activeUsers: 4, groups: 1 },
    { day: 'Fri', totalUsers: 6, activeUsers: 4, groups: 3 },
    { day: 'Sat', totalUsers: 7, activeUsers: 5, groups: 4 },
    { day: 'Sun', totalUsers: 6, activeUsers: 5, groups: 2 },
  ];

  return (
    <div className="w-full">
      <div className="flex min-h-screen">
        {/* Main Panel */}
        <main className="flex-1 p-6">
          <h2 className="text-2xl font-semibold mb-6">Dashboard Overview</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users */}
            <div className="bg-white rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <Users className="text-blue-500" />
                <h3 className="text-lg font-semibold">Total Users</h3>
              </div>
              <p className="mt-2 text-xl font-bold text-blue-600">{users.length}</p>
            </div>

            {/* Active Users */}
            <div className="bg-white rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <UserCheck className="text-green-500" />
                <h3 className="text-lg font-semibold">Active Users</h3>
              </div>
              <p className="mt-2 text-xl font-bold text-green-600">{onlineUsers.length}</p>
            </div>

            {/* Offline Users */}
            <div className="bg-white rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <UserX className="text-red-500" />
                <h3 className="text-lg font-semibold">Offline Users</h3>
              </div>
              <p className="mt-2 text-xl font-bold text-red-500">{offlineCount}</p>
            </div>

            {/* Total Groups */}
            <div className="bg-white rounded-lg p-5 shadow hover:shadow-lg transition">
              <div className="flex items-center gap-3">
                <Layers className="text-purple-500" />
                <h3 className="text-lg font-semibold">Groups</h3>
              </div>
              <p className="mt-2 text-xl font-bold text-purple-600">{allGroups?.length || 0}</p>
            </div>
          </div>

          {/* Chart section */}
          <div className="mt-10 bg-white rounded-lg p-6 shadow">
            <h3 className="text-xl font-semibold mb-4">User & Group Analytics ( Weekly )</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="totalUsers" stroke="#1d4ed8" name="Total Users" />
                <Line type="monotone" dataKey="activeUsers" stroke="#22c55e" name="Active Users" />
                <Line type="monotone" dataKey="groups" stroke="#8b5cf6" name="Groups" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;

