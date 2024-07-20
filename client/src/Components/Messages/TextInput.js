import React, { useEffect, useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import SendIcon from '@material-ui/icons/Send';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { addMessage } from '../../Redux/MessageSlice';

const useStyles = makeStyles((theme) => createStyles({

    wrapForm: {
        display: "flex",
        justifyContent: "center",
        width: "95%",
        margin: `${theme.spacing(0)} auto`
    },
    wrapText: {
        width: "100%"
    }
})
);



export const TextInput = ({ item, Get, scrollToBottom }) => {
    const [content, setContent] = useState('')
    const textFieldRef = useRef(null);

    const dispatch = useDispatch()
    const [isSend, setIsSend] = useState(false)

    useEffect(() => {
        console.log('item props', item);
        console.log('Get props', Get);
    }, [])

    const sendMessage = () => {
        console.log('ref.current value', textFieldRef.current.querySelector('input').value);
        textFieldRef.current.querySelector('input').value = ''
        if (content === '') {
            return;
        }
        setContent('');
        let message;
        console.log('senderId', +sessionStorage.getItem('userId'));
        message = {
            senderId: +sessionStorage.getItem('userId'),
            gettingId: Get === 0 ? (item.ask ? item.askId : item.giveId) : Get,
            content: content,
            itemId: item.id
        }
        console.log(message);
        let isMine;
        if (item.askId)
            isMine = sessionStorage.getItem('userId') == item.askId
        else isMine = sessionStorage.getItem('userId') == item.giveId
        console.log('isMine 1', isMine);
        message.isMine = isMine
        dispatch(addMessage(message))
        setContent(null)
        setIsSend(true)
        scrollToBottom()
    }
    const classes = useStyles();

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault(); 
    
          if (!event.shiftKey) {
            sendMessage(); 
            console.log('enter');
          } else {
            console.log('shift enter');
            setContent(prevContent => prevContent + '\n');
          }
        }
      };

      return (
        <>
            <form className={classes.wrapForm} noValidate autoComplete="off">
                <TextField
                    id="standard-text"
                    label="write a message"
                    className={classes.wrapText}
                    onChange={(event => { setContent(event.target.value) })}
                    ref={textFieldRef}
                    onKeyPress={handleKeyPress}
                    value={content}
                    rowsMax={4}
                    inputRef={textFieldRef}
                />
                <Button variant="contained" color="primary" className={classes.button}
                    onClick={sendMessage}
                >
                    <SendIcon />
                </Button>
            </form>
        </>
    )
}
