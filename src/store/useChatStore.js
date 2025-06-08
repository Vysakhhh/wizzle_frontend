import { create } from "zustand";
import { axiosInstance } from "../services/axios";
import server_url from "../services/server_url";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  groups: [],
  groupMessages: [],
  notifications: [],
  selectedUser: null,
  selectedGroup: null,
  isUsersLoading: false,
  isMessagesLoading: false,
  isGroupsLoading: false,
  notificationsSet: false,


  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get(`${server_url}/users`);
      set({ users: res.data });
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`${server_url}/get-messages/${userId}`);
      set({ messages: res.data });
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

 sendMessages: async (messageData) => {
  const { selectedUser, messages } = get();
  const { socket, authUser } = useAuthStore.getState();

  try {
    const res = await axiosInstance.post(`${server_url}/send-messages/${selectedUser._id}`, messageData);
    set({ messages: [...messages, res.data] });

    
    if (socket && socket.connected) {
      socket.emit("sendMessage", {
        to: selectedUser._id,
        from: authUser._id,
        message: res.data.text, 
        isGroup: false,
      });
    }
  } catch (err) {
    toast.error(err.response.data);
  }
},


  getRealTimeMessages: async () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket || !socket.connected) {
      console.error("Socket is not connected");
      return;
    }

    socket.on("newMessage", (newMessage) => {
      if (newMessage.senderId !== selectedUser._id) return;
      set((state) => ({
        messages: [...state.messages, newMessage],
      }));
    });
  },

  disconnectRealTimeMessages: async () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedUser: (selectedUser) => {
    set({
      selectedUser,
      selectedGroup: null,
    });
  },

  createGroup: async (data) => {
    try {
      const res = await axiosInstance.post(`${server_url}/add-group`, data);
      toast.success("Group created!");
      set({ groups: [...get().groups, res.data] });
    } catch (err) {
      console.log(err.response.data);
    }
  },

  getGroups: async () => {
    try {
      set({ isGroupsLoading: true });
      const res = await axiosInstance.get(`${server_url}/get-groups`);
      set({ groups: res.data });
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      set({ isGroupsLoading: false });
    }
  },

  getGroupMessages: async (groupId) => {
    try {
      set({ isMessagesLoading: true });
      const res = await axiosInstance.get(`${server_url}/get-groupMessage/${groupId}`);
      set({ groupMessages: res.data });
    } catch (err) {
      toast.error(err.response.data);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

 sendGroupMessages: async (groupId, messageData) => {
  const { socket, authUser } = useAuthStore.getState();

  try {
    const res = await axiosInstance.post(`${server_url}/send-groupMessage/${groupId}`, messageData);

    set((state) => {
      const filteredMessages = state.groupMessages.filter((msg) => msg._id !== res.data._id);
      return { groupMessages: [...filteredMessages, res.data] };
    });


    if (socket && socket.connected) {
      socket.emit("sendMessage", {
        to: groupId,
        from: authUser._id,
        message: res.data.text,
        isGroup: true,
      });
    }
  } catch (err) {
    toast.error(err.response.data);
  }
},

  getRealTimeGroupMessages: async () => {
    try {
      const { selectedGroup } = get();
      const socket = useAuthStore.getState().socket;
      if (!selectedGroup || !socket) return;

      socket.on("newGroupMessage", (newMessage) => {
        set((state) => {
          const exists = state.groupMessages.some((msg) => msg._id === newMessage._id);
          if (exists) return state;
          return { groupMessages: [...state.groupMessages, newMessage] };
        });
      });
    } catch (err) {
      console.log(err);
    }
  },

  disconnectRealTimeGroupMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (socket) {
      socket.off("newGroupMessage");
    }
  },

  joinGroupRoom: (groupId) => {
    const socket = useAuthStore.getState().socket;
    if (!socket || !socket.connected) return;
    socket.emit("joinGroup", groupId);
  },

  setSelectedGroup: (selectedGroup) => {
    set({
      selectedGroup,
      selectedUser: null,
    });
    if (selectedGroup?._id) {
      get().joinGroupRoom(selectedGroup._id);
      get().clearGroupNotifications(selectedGroup._id);
    }
  },

  resetChat: () =>
    set({
      selectedUser: null,
      selectedGroup: null,
      groups: [],
      isGroupsLoading: false,
    }),

  getNotifications: async () => {
    const socket = useAuthStore.getState().socket;
    const { notificationsSet } = get();
    if (!socket || notificationsSet) return;

    socket.on("receiveNotification", (notification) => {
      set((state) => ({
        notifications: [...state.notifications, notification],
      }));
    });
    set({ notificationsSet: true })
  },

  clearGroupNotifications: (groupId) => {
    set((state) => ({
      notifications: state.notifications.filter(
        (n) => !(n.type === "group" && n.groupId === groupId)
      ),
    }));
  },
}));
