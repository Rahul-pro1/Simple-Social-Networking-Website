import { useNavigate } from 'react-router-dom'
import './App.css'
import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material'

export default function Nav() {
    const navigate = useNavigate();
    async function logout() {
        fetch('http://localhost:3000/logout', {
            method: 'GET',
            credentials: 'include'
        })
        .then(() => navigate('/'))
        .catch(err => console.log(err))
    } 

    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Wableverse
            </Typography>
            <Button color="inherit" href='/'>Home</Button>
            <Button color="inherit" href='/new'>Post</Button>
            <Button color="inherit" href='/login'>Login</Button>
            <Button color="inherit" onClick={ logout }>Logout</Button>
            <Button color="inherit" href='/about'>About</Button>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                href = '/user'
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
          </Toolbar>
        </AppBar>
      </Box>
    );
  }