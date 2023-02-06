import React, {useState} from 'react';
import {AppBar, Button, Grid, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../../utils/consts";
import {useAuthState} from "react-firebase-hooks/auth";
import {auth} from "../../utils/auth";
import "./navbar.scss"

const Navbar = () => {

    const [user] = useAuthState(auth)
    return (
        <AppBar className="navbar" position="static">
            <Toolbar variant={"dense"}>
                <Grid container justifyContent={"space-between"}>
                    {user ?
                        <div className="navbar--user">
                            <img src={user.photoURL} alt="avatar"/>
                            <h2>{user.displayName}</h2>
                        </div>
                        : <p className="navbar--no-user">React LiveChat Demo</p>
                    }
                    {
                        user ?
                            <Button className="navbar--button" onClick={() => auth.signOut()}
                                    variant={"outlined"}>Logout</Button>
                            :
                            <NavLink to={LOGIN_ROUTE}>
                                <Button className="navbar--button" variant={"outlined"}>Login</Button>
                            </NavLink>

                    }
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
