import { create } from "zustand";

interface UserState {
  username: string;
  profilePicture: string;
}

interface UserStore extends UserState {
  setUserData: (username: string, profilePicture: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  username: "",
  profilePicture: "",
  setUserData: (username, profilePicture) => set({ username, profilePicture }),
}));
