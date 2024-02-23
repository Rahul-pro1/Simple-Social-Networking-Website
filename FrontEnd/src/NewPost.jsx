import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Nav from './Nav.jsx';
import { CssBaseline, ListItem, TextField, Button, Container } from '@mui/material';
import './App.css';

function NewPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [img, setImg] = useState("");
  const [vid, setVid] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(evt) {
    evt.preventDefault(); 

    fetch('http://localhost:3000/', {   
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ title, content }) 
    })
    .then(function() {
      console.log({ title, content });
      navigate('/');
    })
    .catch(function(err) { console.log(err) });
  }

  return (
    <>
      <CssBaseline />
      <Nav />
      <Container maxWidth='sm'>
      <h1>New post</h1>
      <ListItem>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          onChange={evt => setTitle(evt.target.value)}
        />
        <br />
        <TextField
          id="outlined-multiline-flexible"
          label="Content"
          variant="outlined"
          onChange={evt => setContent(evt.target.value)}
        />
        <br />
        <Button color="primary" variant="contained" type="submit">Submit</Button>
      </form>
    </ListItem>
    </Container>
    </>
  );
}

export default NewPost;
