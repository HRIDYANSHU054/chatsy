import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const resp = await fetch(`${API_BASE_URL}/message/users`, {
        credentials: "include",
      });

      if (!resp.ok)
        throw new Error("Unable to fetch users. PLease try again later");

      const data = await resp.json();

      if (!data.success) throw new Error(data.message);

      set({ users: data.data.users });
    } catch (error) {
      console.log(error.message);
      throw error;
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const resp = await fetch(`${API_BASE_URL}/message/${userId}`, {
        credentials: "include",
      });

      if (!resp.ok)
        throw new Error("Unable to fetch messages. PLease try again later");

      const data = await resp.json();

      if (!data.success) throw new Error(data.message);

      set({ messages: data.data.messages });
    } catch (error) {
      console.log(error.message);
      throw error;
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const resp = await fetch(
        `${API_BASE_URL}/message/send/${selectedUser._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(messageData),
        },
      );

      if (!resp.ok)
        throw new Error("Unable to send message. PLease try again later");

      const data = await resp.json();

      if (!data.success) throw new Error(data.message);

      set({ messages: [...messages, data.data.message] });
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  },

  subscribeToMessages: () => {
    // call this function in the Chat Container
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    if (!socket) return;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentBySelectedUser =
        newMessage.senderId === selectedUser._id;
      if (!isMessageSentBySelectedUser) return;

      set({ messages: [...get().messages, newMessage] });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;

    if (!socket) return;

    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser }),
}));
