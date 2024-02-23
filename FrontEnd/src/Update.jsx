import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CssBaseline, ListItem, TextField, Button, Container } from '@mui/material';
import Nav from './Nav.jsx';

function Update() {
  const [data, setData] = useState({});
  const [success, setSuccess] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(function() {
    fetch(`http://localhost/${id}/update`)
    .then(function(res) {return res.json()})
    .then(function(data) {setData(data)})
    .catch(function(err) {console.log(err)});
  }, []);

  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);

  async function handleSubmit(evt) {
    evt.preventDefault(); // Prevent the default form submission behavior

    fetch(`http://localhost:3000/${id}`, { 
      method: 'PUT',
      credentials: 'include',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ title, content })
    })
    .then(function() {
      setSuccess(true);
      navigate('/');
    });
  }


  return (
    <>
      <CssBaseline />
      <Nav />
      <Container maxWidth="sm">
      <h1>Update</h1>
      <ListItem>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Title"
          variant="outlined"
          value={ title }
          onChange={evt => setTitle(evt.target.value)}
        />
        <br />
        <TextField
          id="outlined-multiline-basic"
          label="Content"
          variant="outlined"
          value={ content }
          onChange={evt => setContent(evt.target.value)}
        />
        <br />
        <br />
        <Button color="primary" variant="contained" type="submit">Submit</Button>
      </form>
    </ListItem>
    </Container>
    </>
  );
}

export default Update;
