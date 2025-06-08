import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';


function AdminLayout() {
    const { logOut } = useAuthStore()

    const navigate = useNavigate()

    const handleLogout =async ()=> {
       await logOut()
        navigate('/login')
    }
    
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <aside className="w-64 bg-gray-900 text-white p-6 space-y-6 shadow-md">
                <h2 className="text-2xl  p-5 font-bold">Wizzle</h2>
                <nav className="flex flex-col gap-3  p-5">
                    <Link to="/admin" className="hover:text-blue-400">Dashboard</Link>
                    <Link to="/admin/users" className="hover:text-blue-400">Users</Link>
                    <Link to="/admin/groups" className="hover:text-blue-400">Groups</Link>
                    <button onClick={handleLogout} className="w-full text-center p-3 bg-gray-800 hover:bg-blue-600 text-white rounded mt-4 transition cursor-pointer">
                        Logout
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}

export default AdminLayout;
