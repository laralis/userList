import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useUsers } from "../../store/useUsers";

const addUSerSchema = Yup.object().shape({
  name: Yup.string().required("Required!"),
  email: Yup.string().email("Invalid email").required("Required!"),
});

export default function ModalAddUser() {
  const addUser = useUsers((state) => state.addUser);
  const [openModal, setOpenModal] = useState(false);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: addUSerSchema,
    validateOnMount: true,
    onSubmit: async (values) => {
      await addUser(values);
      setOpenModal(false);
    },
  });

  return (
    <>
      <Button color="blue" onClick={() => setOpenModal(!openModal)}>
        <HiPlus size={20} className="mr-2" />
        New Member
      </Button>

      <Modal show={openModal} onClose={() => setOpenModal(!openModal)}>
        <form onSubmit={formik.handleSubmit}>
          <ModalHeader>Add new member</ModalHeader>
          <ModalBody>
            <div className="flex flex-col gap-2">
              <div>
                <label htmlFor="name">Name</label>
                <TextInput
                  id="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange("name")}
                  onBlur={formik.handleBlur(`name`)}
                />
                {formik.errors.name && formik.touched.name && (
                  <div>{formik.errors.name}</div>
                )}
              </div>

              <div>
                <label htmlFor="mail">Email</label>
                <TextInput
                  name="email"
                  type="email"
                  id="mail"
                  value={formik.values.email}
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur(`email`)}
                />
                {formik.errors.email && formik.touched.email && (
                  <div>{formik.errors.email}</div>
                )}
              </div>
              <div>
                <Button
                  color="success"
                  fullSized
                  type="submit"
                  isProcessing={formik.isSubmitting}
                >
                  Add member
                </Button>
              </div>
            </div>
          </ModalBody>
        </form>
      </Modal>
    </>
  );
}
