import { Button, TableCell, TableRow } from "@mui/material";
import CancelIcon from "@mui/icons-material/Delete";
import Contact from "../Model/Contact";
import { ChangeEvent } from "react";

interface Props {
  editFormData: Contact;
  handleSaveClick: () => void;
  handleEditFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCancelClick: () => void;
}

const EditableRow = ({
  editFormData,
  handleEditFormChange,
  handleSaveClick,
  handleCancelClick,
}: Props) => {
  return (
    <TableRow>
      <TableCell>
        <input
          type="text"
          placeholder="Enter your fullname..."
          name="fullName"
          value={editFormData.fullName}
          onChange={handleEditFormChange}
        ></input>
      </TableCell>
      <TableCell>
        <input
          type="email"
          placeholder="Enter youremail..."
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
        <Button variant="contained" type="submit" onClick={handleSaveClick}>
          Save
        </Button>
      </TableCell>
      <TableCell>
        <CancelIcon onClick={handleCancelClick} />
      </TableCell>
    </TableRow>
  );
};

export default EditableRow;
