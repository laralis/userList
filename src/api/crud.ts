import axios from "axios";
import { v4 as uuid } from "uuid";
import { User } from "./types";

axios.defaults.baseURL = "http://localhost:3000";

export async function getUsers() {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function postUser({ name, email }: Omit<User, `id`>) {
  try {
    await axios.post("/users", {
      name: name,
      email: email,
      id: uuid(),
    });
  } catch (error) {
    console.error(error);
  }
}
export async function deleteUser(id: string) {
  try {
    await axios.delete(`/users/${id}`);
  } catch (error) {
    console.error(error);
  }
}

export async function putUser(
  { name, email }: Omit<Partial<User>, `id`>,
  id: string
) {
  try {
    await axios.put(`/users/${id}`, {
      name: name,
      email: email,
    });
  } catch (error) {
    console.error(error);
  }
}
