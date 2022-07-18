import { Button, Input, TableCell, TableRow } from "@mui/material";
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
        <Input
          type="text"
          placeholder="Enter your fullname..."
          name="fullName"
          autoComplete="off"
          value={editFormData.fullName}
          onChange={handleEditFormChange} />
      </TableCell>
      <TableCell>
        <Input
          type="email"
          placeholder="Enter youremail..."
          name="email"
          autoComplete="off"
          value={editFormData.email}
          onChange={handleEditFormChange}
        />
      </TableCell>
      <TableCell>
        <Input
          type="text"
          placeholder="Enter your Designation"
          name="designation"
          autoComplete="off"
          value={editFormData.designation}
          onChange={handleEditFormChange}
        />
      </TableCell>
      <TableCell>
        <Button variant="contained" type="submit" onClick={() => {handleSaveClick()}
          }>
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
