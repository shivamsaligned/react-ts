import { Box, Button, Grid, Input, Tab, TableCell, TableRow } from '@mui/material'
import { ChangeEvent, FormEvent } from 'react'
import Contact from '../Model/Contact';

interface Props {
    handleAddFormSubmit:(event: FormEvent<HTMLFormElement>) => void;
    handleAddFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
    addFormData: Contact
}

export default function CreateContact(
    {handleAddFormChange,addFormData,handleAddFormSubmit}:Props
) {
  return (
        <Grid container>
    <TableCell>
          <Grid item>
        <Input
          type="text"
          name="fullName"
          placeholder="Enter a name..."
          value={addFormData.fullName}
          autoComplete="off"
          onChange={handleAddFormChange}
          required= {true}
          />
          </Grid>
    </TableCell>
    <TableCell>
        <Grid item>
        <Input
          type="email"
          name="email"
          placeholder="Enter an email..."
          autoComplete="off"
          value={addFormData.email}
          onChange={handleAddFormChange}
          required= {true}
          />
          </Grid>
    </TableCell>
    <TableCell>
          <Grid item>
        <Input
          type="text"
          name="designation"
          placeholder="Enter designation..."
          autoComplete="off"
          value={addFormData.designation}
          onChange={handleAddFormChange}
          required= {true}
          />
          </Grid>
    </TableCell>
    <TableCell>
          <Grid item>
          <form onSubmit={handleAddFormSubmit}>
            <Button size="small" variant="contained" type="submit">
              Add
            </Button>
          </form>
        </Grid>
    </TableCell>
          </Grid>
  )
}