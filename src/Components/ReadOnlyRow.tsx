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
      <TableCell>{contact.fullName}</TableCell>
      <TableCell>{contact.email}</TableCell>
      <TableCell>{contact.designation}</TableCell>
      <TableCell>
        <EditIcon onClick={(event) => handleEditClick(event, contact)} />
      </TableCell>
      <TableCell>
        <DeleteIcon className="delete-button" onClick={(event) => {
          const confirmBox = window.confirm(
            "Do you really want to delete this Contact?"
          )
          if (confirmBox === true) {
            handleDeleteClick(event, contact)
          }
        }} />
      </TableCell>
    </TableRow>
  );
};

export default ReadOnlyRow;