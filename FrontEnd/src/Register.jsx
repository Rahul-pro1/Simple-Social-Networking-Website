import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CssBaseline, ListItem, TextField, FormControl, InputLabel, Button, OutlinedInput, InputAdornment, IconButton, Container } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Nav from './Nav.jsx';
import './App.css'

export default function Register() {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    async function handleSubmit(evt) {
        evt.preventDefault()
        await fetch('http://localhost:3000/register', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ name, username, password })
        })
        navigate('/login');
    }

    function handleShow() {
      setShow(show => !show);
    }

    return (
      <>
      <CssBaseline />
      <Nav />
      <Container maxWidth='sm'>
      <h1>Sign Up!</h1>
      <ListItem>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Name"
          variant="outlined"
          onChange={evt => setName(evt.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={evt => setUsername(evt.target.value)}
        />
        <br />
        <FormControl
          id="outlined-basic"
          variant="outlined"
          onChange={evt => setPassword(evt.target.value)}
        >
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={ show ? 'text':'password' }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleShow}
                  edge="end"
                >
                  {show ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <br />
        <Button color="primary" variant="contained" type="submit">Submit</Button>
      </form>
    </ListItem>
    </Container>
    </>
    )
}