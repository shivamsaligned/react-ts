import { Button, Input } from '@mui/material'
import React, { ChangeEvent } from 'react'

interface Props {
    handleAddFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function CreateContact(
    {handleAddFormChange}:Props
) {
  return (
    <div>
        <Input
          type="text"
          name="fullName"
          placeholder="Enter a name..."
          autoComplete="off"
          onChange={handleAddFormChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter an email..."
          autoComplete="off"
          onChange={handleAddFormChange}
        />
        <Input
          type="text"
          name="designation"
          placeholder="Enter designation..."
          autoComplete="off"
          onChange={handleAddFormChange}
        />
        <Button size="small" variant="contained" type="submit">
          Add
        </Button>
    </div>
  )
}
