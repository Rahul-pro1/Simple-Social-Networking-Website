import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { CssBaseline, Typography, Button, Card, CardContent, CardActions } from '@mui/material';
import Nav from './Nav.jsx'

export default function Profile() {
    const [user, setUser] = useState({})
    const navigate = useNavigate();

    useEffect(function() {
        fetch('http://localhost:3000/user', { credentials: 'include' })
        .then(res => res.json())
        .then(user => setUser(user))
        .catch(err => console.log(err))
    }, [])

    function view(postID) {
        navigate(`/${postID}`);
    }

    function update(postID) {
        navigate(`/${postID}/update`);
    }

    async function deletePost(postID) {
        await fetch(`http://localhost:3000/${postID}`, {
            method: 'DELETE',
            credentials: 'include'
        })
    }

    const posts = user.posts ? user.posts.map(post => {
        if (post != null) {
            return (
            <Card sx={{ minWidth: 275 }} key={ post._id }>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                { user.username }
              </Typography>
              <Typography variant="h5" component="div">
                { post.title }
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={()=>view(post._id)} >View</Button>
              <Button size="small" onClick={()=>update(post._id)} >Update</Button>
              <Button size="small" onClick={()=>deletePost(post._id)} >Delete</Button>
            </CardActions>
          </Card>
        )
        }
    }) : <p>No posts yet!</p>

    return (
        <>
            <CssBaseline />
            <Nav />
            <div className='container'>
                <h1>Hello, { user.name }!</h1>
                <h3>Username: { user.username }</h3> 
                <div>{ posts }</div>
            </div>
        </>
        )
}