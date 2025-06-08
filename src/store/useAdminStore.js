import { create } from "zustand";
import { axiosInstance } from "../services/axios";
import server_url from "../services/server_url";
import toast from 'react-hot-toast';
import { useChatStore } from './useChatStore';



export const useAdminStore = create((set) => ({
  allGroups: [],
  isAdminGroupsLoading: false,

  getAllGroups: async () => {
    set({ isAdminGroupsLoading: true });
    try {
      const res = await axiosInstance.get(`${server_url}/admin-groups`);
      set({ allGroups: res.data });
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      set({ isAdminGroupsLoading: false });
    }
  },
 removeGroup: async (groupId) => {
  try {
    await axiosInstance.delete(`${server_url}/delete-group/${groupId}`);
    
    set(state => ({
      allGroups: state.allGroups.filter(group => group._id !== groupId)
    }));
    
    toast.success("Group removed successfully!");
  } catch (err) {
    toast.error(err.response?.data);
  }
},
 removeUser: async (userId) => {
    try {
    await axiosInstance.delete(`${server_url}/delete-user/${userId}`);
      useChatStore.setState((state) => ({
        users: state.users.filter(user => user._id !== userId),
      }));

      toast.success("User removed successfully!");
    } catch (err) {
      toast.error(err.response.data);
    }
  },

}));