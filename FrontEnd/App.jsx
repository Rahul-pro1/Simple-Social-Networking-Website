import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { CssBaseline, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import Nav from "./Nav.jsx";
import './App.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(function() {
    fetch('http://localhost:3000/', {
      method: 'GET',
      credentials: 'include'
    })
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.log(err));
  }, []);
  
  const navigate = useNavigate();

  function direct(postID) {
    navigate(`/${postID}`);
  }

  const cards = data.map(function(element) {
    return (
      <Card sx={{ minWidth: 275 }} key={ element._id }>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          { element.user }
        </Typography>
        <Typography variant="h5" component="div">
          { element.title }
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=>direct(element._id)} >View</Button>
      </CardActions>
    </Card>

    )
  });

    return (
      <>
        <CssBaseline />
        <Nav />
        <div>
          {cards}
        </div>
      </>
  );
}

export default App;
