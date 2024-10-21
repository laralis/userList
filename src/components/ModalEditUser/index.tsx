import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { User } from "../../api/types";
import { useUsers } from "../../store/useUsers";

interface ModalEditUserProps {
  user: User;
}

export default function ModalEditUser({ user }: ModalEditUserProps) {
  const updateUser = useUsers((state) => state.updateUser);
  const [openEditModal, setOpenEditModal] = useState(false);

  const [name, setName] = useState(user.name);

  const [email, setEmail] = useState(user.email);

  return (
    <>
      <Button
        color={"success"}
        onClick={() => {
          setOpenEditModal(!openEditModal);
        }}
      >
        <BiSolidEdit size={20} className="mr-2" />
        Edit
      </Button>
      <Modal show={openEditModal} onClose={() => setOpenEditModal(false)}>
        <ModalHeader>Edit user</ModalHeader>
        <ModalBody>
          <div className="flex flex-col gap-2">
            <TextInput
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextInput
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              onClick={() => {
                updateUser({ name: name, email: email }, user.id);
                setOpenEditModal(false);
              }}
            >
              Save changes
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}
