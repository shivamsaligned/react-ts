import { TableCell, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Contact from '../Model/Contact'

interface Props {
  contact: Contact;
  handleEditClick:((event: React.MouseEvent,contact:Contact) => void);
  handleDeleteClick:((event: React.MouseEvent, contactId:Contact) => void);
}

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }:Props) => {
  return (
    <TableRow>
      <TableCell>{contact.fullName}</TableCell>
      <TableCell>{contact.email}</TableCell>
      <TableCell>{contact.designation}</TableCell>
      <TableCell>
      <EditIcon onClick={(event) => handleEditClick(event, contact)} />
      </TableCell>
      <TableCell>
      <DeleteIcon onClick={(event) => handleDeleteClick(event,contact)} />
      </TableCell>
    </TableRow>
  );
};

export default ReadOnlyRow;