import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Trash } from 'lucide-react';
import { useAdminStore } from '../store/useAdminStore';
import { LoaderCircle } from 'lucide-react';


function AdminUsers() {
  const { getUsers, users, isUsersLoading } = useChatStore();
  const { removeUser } = useAdminStore()

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleRemoveUser = (userId) => {
    removeUser(userId)
  }
  if (isUsersLoading) {
    return (
      <div className="flex items-center justify-center mb-6">
        <LoaderCircle className="size-10 animate-spin text-blue-400" />
      </div>
    );
  }
  
  return (
    <div className="max-w-6xl mx-auto px-6 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-900">All Users</h2>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <table className="w-full table-auto">
          <thead className="bg-gray-800">
            <tr>
              <th className="text-left p-4 font-semibold text-white uppercase tracking-wide">Name</th>
              <th className="text-left p-4 font-semibold text-white uppercase tracking-wide">Email</th>
              <th className="text-left p-4 font-semibold text-white uppercase tracking-wide">...</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, i) => (
                <tr
                  key={user._id || i}
                  className="border-t hover:bg-gray-50 transition-colors duration-200"
                >
                  <td className="text-left p-4 text-gray-800">{user.fullName}</td>
                  <td className="text-left p-4 text-gray-600">{user.email}</td>
                  <td className="text-left p-4 text-red-800 "><button onClick={() => handleRemoveUser(user._id)} className='cursor-pointer'><Trash /></button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center p-6 text-gray-500 italic">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminUsers;
