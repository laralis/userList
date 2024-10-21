import { create } from "zustand";
import { deleteUser, getUsers, postUser, putUser } from "../../api/crud";
import { User } from "../../api/types";

interface Users {
  users: User[];
  getAllUsers: () => Promise<void>;
  addUser: (user: Omit<User, `id`>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateUser: (user: Omit<Partial<User>, `id`>, id: string) => Promise<void>;
}

export const useUsers = create<Users>((set) => ({
  users: [],

  getAllUsers: async () => {
    const users = await getUsers();
    set({ users: users });
  },

  addUser: async ({ name, email }) => {
    await postUser({ name, email });
    const users = await getUsers();
    set({ users: users });
  },

  deleteUser: async (id) => {
    await deleteUser(id);
    const users = await getUsers();
    set({ users });
  },
  updateUser: async ({ name, email }, id) => {
    await putUser({ name, email }, id);
    const users = await getUsers();
    set({ users });
  },
}));
