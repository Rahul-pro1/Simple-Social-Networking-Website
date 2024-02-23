import Nav from "./Nav.jsx";
import { CssBaseline, Container, Card, CardContent, Typography } from "@mui/material";

export default function About() {
    return (
        <>
        <CssBaseline />
        <Nav />
        <Container maxWidth='sm'>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                PES1UG22AM130
              </Typography>
              <Typography variant="h5" component="div">
                Rahul Sivakumar
              </Typography>
            </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                PES1UG22AM115
              </Typography>
              <Typography variant="h5" component="div">
                Prajwal R
              </Typography>
            </CardContent>
        </Card>
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                PES1UG22AM131
              </Typography>
              <Typography variant="h5" component="div">
                Ranveersinh Wable
              </Typography>
            </CardContent>
        </Card>
        </Container>
        </>
    )
}