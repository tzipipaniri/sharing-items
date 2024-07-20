import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postResponse } from "../Redux/ResponseSlice";
import SendIcon from '@mui/icons-material/Send';

const AddResponse = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.users.user)
    const addResponse = () => {
        dispatch(postResponse({ title: title, content: content }))
    }

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const isFormValid = () => {
        return title.trim() !== '' && content.trim() !== '';
    };


    return (<>

        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                response
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries(formData.entries());
                        const email = formJson.email;
                        console.log(email);
                        handleClose();
                    },
                }}
            >
                <DialogTitle>Send</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add a comment, write a title and body of the comment
                    </DialogContentText>

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="title"
                        name="title"
                        label="Title"
                        type="title"
                        fullWidth
                        variant="standard"
                        onChange={(event) => {
                            console.log(event.target.value);
                            setTitle(event.target.value);
                        }}
                    />

                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="content"
                        name="content"
                        label="Content"
                        multiline
                        rows={4}
                        type="content"
                        fullWidth
                        variant="filled"
                        onChange={(event) => {
                            setContent(event.target.value);
                            console.log('row', event.target.value);
                        }}
                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button
                        type="submit"
                        onClick={addResponse}
                        variant="contained"
                        endIcon={<SendIcon />}
                        disabled={content === '' || title === ''}
                    >Send</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    </>);
}

export default AddResponse;