import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CssBaseline, Card, CardContent, Typography, TextField, Button, Container } from '@mui/material'
import './App.css';
import Nav from './Nav.jsx';

function View() {
    const [data, setData] = useState({});
    const [comment, setComment] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(function() {
        fetch(`http://localhost:3000/${id}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(function(res) {
            console.log(res);
            return res.json();
        })
        .then(function(data) {setData(data)})
        .catch(function(err) {console.log(err)})
    }, []);

    async function handleSubmit(evt) {
        evt.preventDefault();
        fetch(`http://localhost:3000/${id}/comment`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({ text: comment })
        })
        .then(()=>navigate(`/`))
        .catch(function(err) {console.log(err)})
    }

    async function like() {
        await fetch(`http://localhost:3000/${id}/like`, { credentials: 'include' });
    }

    const comments = data.comments ? data.comments.map(function(comment) {
        return (
        <Card sx={{ minWidth: 275 }} key={ comment._id }>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                { comment.user }
              </Typography>
              <Typography variant="body2">
                { comment.text }
              </Typography>
            </CardContent>
          </Card>
        )
    }) : null;

    return (
        <>
            <CssBaseline />
            <Nav />
            <Container maxWidth="sm">
                <h1>{data.title}</h1>
                <h3>{data.user}</h3>
                <p>{data.content}</p>
                <p>Likes: { data.likes }</p>
                <Button variant='contained' color='primary' onClick = { like }>Like</Button>
                <h3>Comments:</h3>
                <div>
                    { comments }
                </div>
                <form method='POST' onSubmit = { handleSubmit }>
                    <TextField 
                        id="outlined-multiline-flexible"
                        label="Comment"
                        variant="outlined"
                        onChange={evt => setComment(evt.target.value)}
                    />
                    <br />
                    <Button color='success' type="submit" className='btn btn-success'>Add comment</Button>
                </form>
        </Container>
        </>
    )
}

export default View;