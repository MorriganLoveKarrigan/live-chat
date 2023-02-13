import React, {useEffect, useRef, useState} from 'react';
import {collection, query, orderBy, onSnapshot} from "firebase/firestore";
import {auth, firestore} from "../../utils/auth";
import {Skeleton} from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import "./message.scss"

const Message = () => {
    const [messages, setMessages] = useState([])
    const q = query(collection(firestore, "messages"), orderBy('timestamp'))
    console.log(messages)
    const unsub = () => onSnapshot(q, (snapshot) => {
        let arr = []
        console.log(snapshot)
        snapshot.forEach((doc) => {
            arr.push({...doc.data(), id: doc.id})
        })
        console.log(messages,'before set')
        setMessages(arr)
        console.log(messages,'after set')

    })

    useEffect(() => {
        return () => {
            unsub()
        }
    }, []);

    const scroll = useRef(null)

    useEffect(() => {
        scroll?.current?.scrollIntoView({behavior:"smooth"})
    }, [messages]);
    

    return (
        messages.map(({userImg, timestamp, text, userName, id,uid}) => {
            let date = timestamp?.toDate()
            const messageFrom = uid === auth.currentUser.uid ? 'me' : 'another'
            return (
                <div className={`row ${messageFrom}`} key={id}>
                    <div className="message">
                        <div className="message--image">
                            <img src={ userImg || <PersonIcon/> } alt="avatar"/>
                        </div>
                        <div>
                            <div className="message--info">
                                <p> {userName} </p>
                                <div>
                                    { date ?  (
                                        <>
                                            <span>{new Date(date).toLocaleDateString()}:</span>
                                            <span>{new Date(date).toLocaleTimeString()}</span>
                                        </>
                                        )
                                    :  <Skeleton variant={"text"} width={100}/>
                                    }
                                </div>
                            </div>
                            <div className="message--text">
                                {text}
                            </div>
                        </div>
                    </div>
                    <div ref={scroll}/>
                </div>
            )
        })
    );
};

export default Message;
