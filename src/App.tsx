import React, {
  useState,
  Fragment,
  ChangeEvent,
  FormEvent,
  useEffect,
  ChangeEventHandler,
} from "react";
import { nanoid } from "nanoid";
import "./App.css";
import ReadOnlyRow from "./Components/ReadOnlyRow";
import EditableRow from "./Components/EditableRow";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import {
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  styled,
  InputBase,
  alpha,
  Box,
  Grid,
  Button,
  Input,
  TextField,
} from "@mui/material";
import Contact from "./Model/Contact";
import axios from "axios";
import ContactService from "./Service/ContactService";
import NavBar from "./Components/NavBar";
import CreateContact from "./Components/CreateContact";
import { AddCircle, ImportExport } from "@mui/icons-material";

const service = new ContactService();

type SortType = {
  key: string;
  direction: string;
}

const App = () => {
  useEffect(() => {
    getContacts();
  }, []);

  // API's
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
      console.log(data, 'executing')
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
      console.log(del)
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

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [field, setField] = useState(false)
  const [sortConfig, setSortConfig] = useState<SortType | null>(null)
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

  const [search, setSearch] = useState('')


  const requestSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig) {
      if (sortConfig.key === key && sortConfig.direction === 'ascending') {
        direction = 'descending';
      }
    }
    setSortConfig({ key, direction });
    sorter()
  }

  const sorter = () => {
    let sortedContacts = [...contacts];
    if (sortConfig !== null) {
      sortedContacts = sortedContacts.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    setContacts(sortedContacts)
    return sortedContacts;
  }

  const positionArrow = () => {
    if (sortConfig) {
      if (sortConfig.direction === 'ascending')
        return <ArrowUpwardIcon sx={{ fontSize: 'small' }} />
      if (sortConfig.direction === 'descending')
        return <ArrowDownwardIcon sx={{ fontSize: 'small' }} />
    }
    return <ImportExport sx={{ fontSize: 'small' }} />
  }

  // Events
  const searchfield = () => {
    let searcher = contacts.filter(
      (contact: Contact) =>
        contact.fullName.toLowerCase().includes(search.toLowerCase()) ||
        contact.email.toLowerCase().includes(search.toLowerCase()) ||
        contact.designation.toLowerCase().includes(search.toLowerCase())
    );
    console.log(searcher);
    setContacts(searcher)
  };

  const handleSearch = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearch(event.target.value)
    searchfield()
  }
  const handleAddClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log('Clicked');
    setField(true)
  }

  const handleCancelBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setField(false)
  }

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

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginTop: '12px',
    alignItems: 'right',
    justifyContent: 'right',
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(3.2, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'right',
    justifyContent: 'right',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    border:'1px solid seagreen',
    marginTop:'5px',
    marginRight: '2.4px',
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '10ch',
      },
    },
  }));
  return (
    <Box className="app-container">
      <NavBar handleAddFormChange={handleAddFormChange} />
      <form onSubmit={handleAddFormSubmit}>
        <Grid container justifyContent='space-between'>
          <Grid item>{
            field ?
              <CreateContact
                handleCancelBtnClick={handleCancelBtnClick}
                handleAddFormChange={handleAddFormChange}
                addFormData={addFormData}
              /> : null
          }
          </Grid>
          <Grid item>
            {!field ? <Button variant="contained" onClick={handleAddClick} style={{ marginTop: '1.2rem', marginLeft: '62rem' }}>Add</Button> : null}
          </Grid>
          <Grid item>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <Search>
              <StyledInputBase placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }} type={search} value={search} onChange={handleSearch} />
            </Search>
          </Grid>
        </Grid>
      </form>
      <form onSubmit={handleEditFormSubmit}>
        <Paper sx={{ width: "100%" }} />
        <TableContainer sx={{ maxHeight: 450 }}>
          <Table stickyHeader sx={{ minWidth: 500 }} aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell onClick={() => requestSort('fullName')}>FullName {positionArrow()}</TableCell>
                <TableCell onClick={() => requestSort('email')}>Email {positionArrow()}</TableCell>
                <TableCell onClick={() => requestSort('designation')}> Designation {positionArrow()}</TableCell>
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
        </TableContainer>
      </form>
    </Box>
  );
};

export default App;
