import { TableCell, TableRow } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <TableRow>
      <TableCell>{contact.fullName}</TableCell>
      <TableCell>{contact.email}</TableCell>
      <TableCell>{contact.designation}</TableCell>
      <TableCell>
      <EditIcon onClick={(event) => handleEditClick(event, contact)} />
      </TableCell>
      <TableCell>
      <DeleteIcon onClick={() => handleDeleteClick(contact.id)} />
      </TableCell>
    </TableRow>
  );
};

export default ReadOnlyRow;