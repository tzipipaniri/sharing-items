import React, { useEffect, useRef, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Button, Paper } from "@material-ui/core";
import { TextInput } from "./TextInput.js";
import { MessageLeft, MessageRight } from "./Messages.js";
import axios from 'axios'
import { styled } from "@mui/material";
import { purple } from "@mui/material/colors";

const useStyles = makeStyles((theme) => createStyles({
    paper: {
        width: "80vw",
        height: "80vh",
        maxWidth: "500px",
        maxHeight: "700px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative",
    },
    paper2: {
        width: "80vw",
        maxWidth: "500px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        position: "relative"
    },
    container: {
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    messagesBody: {
        width: "calc( 100% - 20px )",
        margin: 10,
        overflowY: "scroll",
        height: "calc( 100% - 80px )"
    }
})
);

export default function Main({ messages, Item, get }) {
    const [profile, setProfile] = useState()
    const [isMine, setIsMine] = useState()
    const getImage = async () => {
        try {
            if (sessionStorage.getItem('profile')) {
                let response = await axios.get(`https://localhost:7106/api/User/getImage/${sessionStorage.getItem('profile')}`)
                setProfile(response.data)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    const scrollToBottom = () => {
        chatRef.current.scrollTop = chatRef.current.scrollHeight;
    };

    useEffect(() => {
        getImage()
        console.log('mrssages', messages);
        console.log('Item', Item);
        const userId = sessionStorage.getItem('userId')
        if (Item.giveId) {
            setIsMine(Item.giveId == userId)
            console.log('give', Item.giveId == userId);
        }
        else {
            setIsMine(Item.askId == userId)
            console.log('ask', Item.askId == userId);
        }
        scrollToBottom()
    }, [])
    const date = (d) => {
        const date = new Date(d);

        const formattedDate = date.toLocaleDateString("he-IL");

        console.log('response', formattedDate);
        return formattedDate
    }

    const chatRef = useRef(null);



    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));

    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Paper className={classes.paper} zDepth={2}>
                <Paper id="style-1" className={classes.messagesBody} ref={chatRef}>
                    {messages?.map(m => {
                        return <>
                            {m.senderId == sessionStorage.getItem('userId') &&
                                <MessageLeft
                                    message={m.content}
                                    timestamp={date(m.date)}
                                    photoURL={profile}
                                    displayName={sessionStorage.getItem('firstName')}
                                    avatarDisp={true}
                                />}
                            {m.senderId != sessionStorage.getItem('userId') && <MessageRight
                                message={m.content}
                                timestamp={date(m.date)}
                                photoURL={isMine ? messages[0].sender.image : messages[0].getting.image}
                                displayName={isMine ? messages[0].sender.firstName : messages[0].getting.firstName}
                                avatarDisp={true}
                            />}
                        </>
                    })}
                   
                </Paper>
                <ColorButton variant="contained" onClick={scrollToBottom}> Scroll to End <span>&darr;</span></ColorButton>
                <TextInput item={Item} Get={get} scrollToBottom={scrollToBottom} />
            </Paper>
        </div>
    );
}
