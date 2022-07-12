import React, {
  useState,
  Fragment,
  ChangeEvent,
  FormEvent,
  useEffect,
} from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ReadOnlyRow from "./Components/ReadOnlyRow";
import EditableRow from "./Components/EditableRow";
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TablePagination,
} from "@mui/material";
import Contact from "./Model/Contact";
import axios from "axios";
import ContactService from "./Service/ContactService";
import Bar from "./Components/Bar";
import CreateContact from "./Components/CreateContact";

const service = new ContactService();

const App = () => {
  useEffect(() => {
    getContacts();
  }, []);

  // API
  const getContacts = async () => {
    try {
      const data = await service.getContact();
      setContacts(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("error message:", err.message);
        return err.message;
      } else {
        console.log("unexpected error during fecthing:", err);
        return "An unexpected error occured";
      }
    }
  };

  const postContacts = async (Contact: Contact) => {
    try {
      const data = await service.postContact(Contact);
      console.log(data, "Error during post");
      setAddFormData(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("error message:", err.message);
        return err.message;
      } else {
        console.log("unexpected error during post:", err);
        return "An unexpected error occured";
      }
    }
  };

  const putContacts = async (Contact: Contact) => {
    try {
      const data = await service.putContact(Contact);
      setEditFormData(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("error message:", err.message);
        return err.message;
      } else {
        console.log("unexpected error during updating:", err);
        return "An unexpected error occured";
      }
    }
  };

  const deleteContact = async (Contact: Contact) => {
    try {
      let del = await service.deleteContact(Contact);
      console.log(del, "error during deletion");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        console.log("error message:", err.message);
        return err.message;
      } else {
        console.log("unexpected error during deleting:", err);
        return "An unexpected error occured";
      }
    }
  };

  // States
  const [page, setPage] = useState(2);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [addFormData, setAddFormData] = useState<Contact>({
    id: "",
    fullName: "",
    email: "",
    designation: "",
  });

  const [editFormData, setEditFormData] = useState<Contact>({
    id: "",
    fullName: "",
    email: "",
    designation: "",
  });

  const [editContactId, setEditContactId] = useState<string | null>(null);

  // Events
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 3));
    setPage(0);
  };

  const handleAddFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    if (fieldName) {
      const newFormData: any = { ...addFormData };
      newFormData[fieldName] = fieldValue;

      setAddFormData(newFormData);
    }
  };

  const handleEditFormChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    if (fieldName) {
      const newFormData: any = { ...editFormData };
      newFormData[fieldName] = fieldValue;

      setEditFormData(newFormData);
    }
  };

  const handleSaveClick = () => {
    console.log(editContactId);

    if (editContactId) {
      const editedContact: Contact = {
        id: editContactId,
        fullName: editFormData.fullName,
        email: editFormData.email,
        designation: editFormData.designation,
      };
      const newContacts = [...contacts];

      const index = contacts.findIndex(
        (contact) => contact.id === editContactId
      );

      newContacts[index] = editedContact;

      setContacts(newContacts);
      putContacts(editedContact);
      setEditContactId(null);
    }
  };

  const handleAddFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newContact: Contact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      email: addFormData.email,
      designation: addFormData.designation,
    };

    const newContacts = [...contacts, newContact];
    postContacts(newContact);
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editContactId) {
      const editedContact: Contact = {
        id: editContactId,
        fullName: editFormData.fullName,
        email: editFormData.email,
        designation: editFormData.designation,
      };

      const newContacts = [...contacts];

      const index = contacts.findIndex(
        (contact) => contact.id === editContactId
      );

      newContacts[index] = editedContact;

      setContacts(newContacts);
      setEditContactId(null);
    }
  };

  const handleEditClick = (event: React.MouseEvent, contact: Contact) => {
    event.preventDefault();
    setEditContactId(contact.id);

    const formValues = {
      id: contact.id,
      fullName: contact.fullName,
      email: contact.email,
      designation: contact.designation,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (event: React.MouseEvent, contactId: Contact) => {
    const newContacts = [...contacts];
    const index = contacts.findIndex((contact) => contact.id === contactId.id);
    newContacts.splice(index, 1);
    deleteContact(contactId);
    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleAddFormSubmit}>
        <Bar />
        <CreateContact
        handleAddFormChange = {handleAddFormChange}
        />
      </form>
      <form onSubmit={handleEditFormSubmit}>
        <Paper sx={{ width: "100%" }} />
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader sx={{ minWidth: 500 }} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>FullName</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <Fragment key={contact.id}>
                  {editContactId === contact.id ? (
                    <EditableRow
                      handleSaveClick={handleSaveClick}
                      editFormData={editFormData}
                      handleEditFormChange={handleEditFormChange}
                      handleCancelClick={handleCancelClick}
                    />
                  ) : (
                    <ReadOnlyRow
                      contact={contact}
                      handleEditClick={handleEditClick}
                      handleDeleteClick={handleDeleteClick}
                    />
                  )}
                </Fragment>
              ))}
            </TableBody>
          </Table>
          <TablePagination
          rowsPerPageOptions={[5,10, 25, 100]}
            component="div"
            count={5}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </TableContainer>
      </form>
    </div>
  );
};

export default App;
