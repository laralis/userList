import { TextInput } from "flowbite-react";
import ModalAddUser from "../ModalAddUser";

interface HeaderProps {
  search: string;
  setSearch: (value: string) => void;

}
export default function Header({ search, setSearch }: HeaderProps) {
  return (
    <header className="flex justify-between mb-4">
      <ModalAddUser  />
      <TextInput
        theme={{ field: { base: "flex w-[300px]" } }}
        placeholder="search member ..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </header>
  );
}
