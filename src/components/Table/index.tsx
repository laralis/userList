import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { MdDelete } from "react-icons/md";
import ModalEditUser from "../ModalEditUser";
import { User } from "../../api/types";
import { useUsers } from "../../store/useUsers";

interface GenericTableProps {
  filteredUsers: User[];
}

export default function GenericTable({ filteredUsers }: GenericTableProps) {
  const deleteUser = useUsers((state) => state.deleteUser);
  return (
    <Table>
      <TableHead>
        <TableHeadCell>First name</TableHeadCell>
        <TableHeadCell>Email</TableHeadCell>
        <TableHeadCell>Action</TableHeadCell>
      </TableHead>
      <TableBody>
        {filteredUsers.map((user) => {
          return (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell className="flex gap-2">
                <ModalEditUser user={user} />
                <Button color={"failure"} onClick={() => deleteUser(user.id)}>
                  <MdDelete size={20} className="mr-2" />
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
