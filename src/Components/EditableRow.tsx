import { Button, TableCell, TableRow } from "@mui/material";
import CancelIcon from '@mui/icons-material/Delete';

type ButtonProps = {
  handleEditFormChange: () => string
}

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  return (
    <TableRow>
      <TableCell>
        <input
          type="text"
          placeholder="Enter a name..."
          name="fullName"
          value={editFormData.fullName}
          onChange={handleEditFormChange}
        ></input>
      </TableCell>
      <TableCell>
        <input
          type="email"
          placeholder="Enter an email..."
          name="email"
          value={editFormData.email}
          onChange={handleEditFormChange}
        ></input>
      </TableCell>
      <TableCell>
        <input
          type="text"
          placeholder="Enter your Designation"
          name="designation"
          value={editFormData.designation}
          onChange={handleEditFormChange}
        ></input>
      </TableCell>
      <TableCell>
      <Button size="small" variant="contained" type="submit">Save</Button>
        </TableCell>
        <TableCell>
        <CancelIcon onClick={handleCancelClick} />
        </TableCell>
    </TableRow>
  );
};

export default EditableRow;