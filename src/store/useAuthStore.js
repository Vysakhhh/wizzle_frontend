import { create } from "zustand"
import { axiosInstance } from "../services/axios"
import server_url from "../services/server_url"
import toast from 'react-hot-toast';
import { io } from "socket.io-client"



export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingprofile: false,
    isCheckingAuth: true,
    onlineUsers: [],
    socket: null,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get(`${server_url}/check-auth`)
            console.log(res);
            set({ authUser: res.data.user })
            get().connectSocket()
        }
        catch (err) {
            console.log("Error in useAuthStore", err.message);
            set({ authUser: null })

        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    signUp: async (formData) => {
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post(`${server_url}/signup`, formData);

            localStorage.setItem('token', res.data.token);
            set({ authUser: res.data.user });

            toast.success("Account created successfully!!");
            get().connectSocket();

        } catch (err) {
            toast.error(err.response?.data || "Signup failed");
        } finally {
            set({ isSigningUp: false });
        }
    },

    login: async (formData) => {
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post(`${server_url}/login`, formData);

            localStorage.setItem('token', res.data.token);

            set({ authUser: res.data.user });

            toast.success("Logged in successfully!!");
            get().connectSocket();

        } catch (err) {
            toast.error(err.response?.data || "Login failed");
        } finally {
            set({ isLoggingIn: false });
        }
    },

    logOut: async () => {
        try {
            await axiosInstance.post(`${server_url}/logout`);

            localStorage.removeItem('token');

            set({ authUser: null });

            get().disconnectSocket();
            toast.success("Logged out successfully");
        } catch (err) {
            toast.error(err.response?.data || "Logout failed");
        } finally {
            set({ socket: null });
        }
    },

    updateProfile: async (data) => {
        set({ isUpdatingprofile: true })

        try {

            const res = await axiosInstance.put(`${server_url}/update-profile`, data)
            set({ authUser: res.data })
            toast.success("profile updated successfully!")


        }
        catch (err) {
            toast.error(err.response.data)
        }
        finally {
            set({ isUpdatingprofile: false })
        }
    },

    connectSocket: async () => {
        const { authUser } = get()
        if (!authUser || get().socket?.connected) {
            return;
        }
        const socket = io(`${server_url}`, {
            query: {
                userId: authUser._id
            }
        })
        socket.connect()

        set({ socket: socket })

        socket.on("getOnlineUsers", (userIds) => {
            set({ onlineUsers: userIds })
        })
    },

    disconnectSocket: async () => {
        const socket = get().socket;
        if (socket) {
            socket.off("getOnlineUsers");
            socket.disconnect();
            set({ socket: null });
        }
    }

}))