import { Button, Collapse, Input, Snackbar, TableCell, TableRow } from '@mui/material'
import { ChangeEvent } from 'react'
import Contact from '../Model/Contact';

interface Props {
  handleAddFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCancelBtnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  addFormData: Contact;
  handleclick:() => void
}

export default function CreateContact(
  { handleAddFormChange,handleclick, addFormData, handleCancelBtnClick }: Props
) {
  return (
    <TableRow>
      <TableCell>
        <Input
          type="text"
          name="fullName"
          placeholder="Enter a name..."
          value={addFormData.fullName}
          autoComplete="off"
          onChange={handleAddFormChange}
          required={true}
        />
      </TableCell>
      <TableCell>
        <Input
          type="email"
          name="email"
          placeholder="Enter an email..."
          autoComplete="off"
          value={addFormData.email}
          onChange={handleAddFormChange}
          required={true}
        />
      </TableCell>
      <TableCell>
        <Input
          type="text"
          name="designation"
          placeholder="Enter designation..."
          autoComplete="off"
          value={addFormData.designation}
          onChange={handleAddFormChange}
          required={true}
        />
      </TableCell>
      <Button onClick={handleclick} size="small" variant="contained" type="submit" style={{ marginTop: '20px', marginRight: '1px' }}>
        Submit
      </Button>
      <Button size='small' variant='contained' onClick={handleCancelBtnClick} style={{ marginTop: '20px' }}>Cancel</Button>
    </TableRow>
  )
}