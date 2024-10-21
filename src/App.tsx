import Header from "./components/Header";
import GenericTable from "./components/Table";
import { useEffect, useState } from "react";
import { useUsers } from "./store/useUsers";

export default function App() {
  const { users, getAllUsers } = useUsers();

  const [search, setSearch] = useState("");

  const filteredUsers =
    search !== ""
      ? users.filter((user) =>
          user.name.toLocaleLowerCase().startsWith(search.toLocaleLowerCase())
        )
      : users;

  useEffect(() => {
    const fetchData = async () => {
      await getAllUsers();
    };
    fetchData();
  }, [getAllUsers]);

  return (
    <div className="max-w-[800px] mx-auto mt-6 px-2">
      <Header search={search} setSearch={setSearch} />
      <GenericTable filteredUsers={filteredUsers} />
    </div>
  );
}
