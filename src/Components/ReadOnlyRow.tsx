import { TableCell, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Contact from '../Model/Contact'

interface Props {
  contact: Contact;
  handleEditClick: ((event: React.MouseEvent, contact: Contact) => void);
  handleDeleteClick: ((event: React.MouseEvent, contactId: Contact) => void);
}

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }: Props) => {
  return (
    <TableRow>
      <TableCell style={{border: '1px solid seagreen'}}>{contact.fullName}</TableCell>
      <TableCell style={{border: '1px solid seagreen'}}>{contact.email}</TableCell>
      <TableCell style={{border: '1px solid seagreen'}}>{contact.designation}</TableCell>
      <TableCell style={{border: '1px solid seagreen'}}>
        <EditIcon onClick={(event) => handleEditClick(event, contact)} />
      </TableCell>
      <TableCell style={{border: '1px solid seagreen'}}>
        <DeleteIcon className="delete-button" onClick={(event) => { handleDeleteClick(event, contact)}
        } />
      </TableCell>
    </TableRow>
  );
};

export default ReadOnlyRow;