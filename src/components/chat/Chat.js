import React, {useState} from 'react';
import {auth, firestore} from "../../utils/auth";
import {useAuthState} from "react-firebase-hooks/auth";
import {Container, Grid, InputAdornment, TextField, ToggleButton,} from "@mui/material";
import {collection, addDoc, serverTimestamp} from "firebase/firestore"
import Message from "../message/Message";
import SendIcon from '@mui/icons-material/Send';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import "./chat.scss"

const Chat = () => {
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(false)
    console.log(user)

    async function sendMessage() {
        if (!value) return
        setLoading(true)
        console.log(value)
        await addDoc(collection(firestore, "messages"), {
            text: value.trim(),
            userName: user.displayName,
            userImg: user.photoURL,
            uid: user.uid,
            timestamp: serverTimestamp(),
        });
        setValue("");
        setLoading(false)
    }

    async function handlerKeyDown(event) {
        let {key} = event
        if (key !== "Enter") return
        setLoading(true)
        await sendMessage()
        setLoading(false)
    }

    return (
        <Container className="chat-page">
            <Grid
                container
                style={{height: window.innerHeight - 100, marginTop: 10}}
                justifyContent={"center"}
            >
                <div className="chat" style={{width: '80%', overflowY: 'auto', backgroundColor: "#1B263B"}}>
                    <Message/>
                </div>
                <Grid
                    container
                    direction={"column"}
                    alignItems={"center"}
                    style={{width: '80%'}}
                >
                    <TextField
                        variant={"outlined"}
                        fullWidth
                        maxRows={3}
                        value={value}
                        className="chat-page--input"
                        onChange={(event) => setValue(event.target.value)}
                        onKeyDown={(event) => handlerKeyDown(event)}
                        InputProps={{
                            endAdornment: <InputAdornment
                                style={{height: "20px"}}
                                position="end"
                                onClick={sendMessage}
                            >
                                <ToggleButton value={loading} style={{border: "none"}}>
                                    {loading ? <PendingOutlinedIcon/> : <SendIcon/>}
                                </ToggleButton>
                            </InputAdornment>,
                        }}
                    />
                </Grid>

            </Grid>
        </Container>
    );
};

export default Chat;
