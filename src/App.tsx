import React, { useState, Fragment, ChangeEvent, FormEvent, useEffect } from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ReadOnlyRow from "./Components/ReadOnlyRow";
import EditableRow from "./Components/EditableRow";
import { TableContainer, Paper, Table, TableRow, TableCell, Button, TableHead, TableBody } from "@mui/material";
import Contact from './Model/Contact'
import axios from 'axios'
// import Contactservice from './Service/Contactservice'

const App = () => {
  useEffect( () => {
    const getContacts = async () => {
      try {
        const { data} = await axios.get(
          'http://localhost:2000/contacts',
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );
        console.log(data, 'Getting Data');
  
        setContacts(data)
      }
      catch (err) {
        if (axios.isAxiosError(err)) {
          console.log('error message:', err.message);
          return err.message
        } else {
          console.log('unexpected error:', err);
          return 'An unexpected error occured'
        }
      }
    }
    getContacts()
},[])

  const postContacts = async() => {
    try {
      // const poscontacts = {id: "",firstName: "",email:"", designation: ""}
     await axios.post('http://localhost:2000/contacts')
     .then()
    }
    catch(err) {
      if (axios.isAxiosError(err)) {
        console.log('error message:', err.message);
        return err.message
      } else {
        console.log('unexpected error:', err);
        return 'An unexpected error occured'
      }
    }
  }
  postContacts()

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
    };
  }

  const handleAddFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newContact: Contact = {
      id: nanoid(),
      fullName: addFormData.fullName,
      email: addFormData.email,
      designation: addFormData.designation,
    };

    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
  };

  const handleEditFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editContactId) {

      const editedContact: Contact = {
        id: editContactId,
        fullName: editFormData.fullName,
        email: editFormData.email,
        designation: editFormData.designation
      };

      const newContacts = [...contacts];

      const index = contacts.findIndex((contact) => contact.id === editContactId);

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
      designation: contact.designation
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

    setContacts(newContacts);
  };

  return (
    <div className="app-container">
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Enter a name..."
          onChange={handleAddFormChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter an email..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="designation"
          placeholder="Enter designation..."
          onChange={handleAddFormChange}
        />
        <Button size="small" variant="contained" type="submit">Add</Button>
      </form>
      <form onSubmit={handleEditFormSubmit}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <h4>ALIGNED AUTOMATION</h4>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Designation</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <Fragment key ={contact.id}>
                  {editContactId === contact.id ? (
                    <EditableRow
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
        </TableContainer>
      </form>
    </div>
  );
};

export default App;