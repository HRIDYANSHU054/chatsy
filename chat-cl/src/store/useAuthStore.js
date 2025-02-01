import { io } from "socket.io-client";
import { create } from "zustand";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const SERVER_BASE_URL = import.meta.env.VITE_SERVER_URL;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  onlineUsers: [],
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true, //coz always check auth on app load
  authError: null,
  socket: null,

  checkAuth: async () => {
    set({ isCheckingAuth: true, authError: null });
    try {
      const resp = await fetch(`${API_BASE_URL}/auth/check-auth`, {
        credentials: "include",
      });

      if (!resp.ok) throw new Error("User not authenticated");

      const data = await resp.json();

      if (!data.success) throw new Error(data.message);

      set({ authUser: data.data.user });

      get().connectSocket();
    } catch (error) {
      console.log(error.message);
      set({
        authUser: null,
        authError: error.message ?? "User not authenticated",
      });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (formData) => {
    set({ isSigningUp: true, authError: null });
    try {
      const resp = await fetch(`${API_BASE_URL}/auth/signup`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!resp.ok)
        throw new Error("Unable to sign you up. PLease try again later");

      const data = await resp.json();

      if (!data.success) throw new Error(data.message);

      set({ authUser: data.data.user });
      get().connectSocket();
    } catch (error) {
      console.log(error.message);
      set({
        authUser: null,
        authError: error.message ?? "Something went wrong while signing you up",
      });
      throw error;
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (formData) => {
    set({ isLoggingIn: true, authError: null });
    try {
      const resp = await fetch(`${API_BASE_URL}/auth/login`, {
        credentials: "include",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) throw new Error("Unable to login. PLease try again later");

      const data = await resp.json();

      if (!data.success) throw new Error(data.message);

      set({ authUser: data.data.user });
      get().connectSocket();
    } catch (error) {
      console.log(error.message);
      set({
        authUser: null,
        authError: error.message ?? "Something went wrong while logging you in",
      });
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  updateProfile: async (formData) => {
    set({ isUpdatingProfile: true, authError: null });
    try {
      const resp = await fetch(`${API_BASE_URL}/user/update-profile`, {
        credentials: "include",
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!resp.ok)
        throw new Error(
          "Unable to update your profile. PLease try again later",
        );

      const data = await resp.json();

      if (!data.success) throw new Error(data.message);

      set({ authUser: data.data.user });
    } catch (error) {
      console.log(error.message);
      throw error;
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  logout: async () => {
    try {
      const resp = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      if (!resp.ok) throw new Error("Unable to logout");

      set({ authUser: null });
      get().disconnectSocket();
    } catch (error) {
      console.log(error.message);
      set({
        authError:
          error.message ?? "Something went wrong while logging you out",
      });
    }
  },

  connectSocket: () => {
    const { authUser, socket: skt } = get();
    if (!authUser || skt?.connected) return;

    const socket = io(SERVER_BASE_URL, {
      query: { userId: authUser._id },
    });
    socket.connect();
    set({ socket });

    socket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket.connected) socket.disconnect();
  },
}));

////
