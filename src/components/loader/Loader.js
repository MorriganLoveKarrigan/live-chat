import React from 'react';
import {Box, CircularProgress, Container, Grid} from "@mui/material";

const Loader = () => {
    return (
        <Container>
            <Grid
                container
                style={{height:window.innerHeight - 50}}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Box p={5}>
                    <CircularProgress size={300} color="secondary" />
                </Box>
            </Grid>
        </Container>
    );
};

export default Loader;
