import React from 'react';
import {Box, Button, Container, Grid} from "@mui/material";
import {GoogleAuthProvider,signInWithPopup} from 'firebase/auth'
import {auth} from "../../utils/auth";
import "./login.scss"

const Login = () => {

    const login = async () => {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth,provider)
        console.log(result)
    }

    return (
        <Container className="login-page">
                <Grid
                    container
                    alignItems={"center"}
                    justifyContent={"center"}
                    height={window.innerHeight - 100}
                >
                    <Box p={5}  className="login-page--block">
                        <Button className="login-page--block--button" onClick={login} variant={"outlined"}>
                            Login with Google
                        </Button>
                    </Box>
                </Grid>
        </Container>
    );
};

export default Login;
