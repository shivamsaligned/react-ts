import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { ChangeEvent } from 'react';

interface Props {
  handleAddFormChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function NavBar({handleAddFormChange}:Props) {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            align='center'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Aligned Automation
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

