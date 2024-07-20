import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { useDispatch } from 'react-redux';
import { deleteResponse } from '../Redux/ResponseSlice';
import DeleteIcon from '@mui/icons-material/Delete';



function PaperComponent(props) {
    return (
        <Draggable
            handle="#draggable-dialog-title"
            cancel={'[class*="MuiDialogContent-root"]'}
        >
            <Paper {...props} />
        </Draggable>
    );
}

export default function DeleteResponse({ response,Delete ,setDelete}) {
    const [open, setOpen] = React.useState(true);
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (isDelete) => {
        if (isDelete==='delete'){
            dispatch(deleteResponse(response.id))
            Delete(response.id)
        }
        setDelete()
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                onClose={handleClose}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                    Delete
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete your comment?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => { handleClose('delete') }}
                    variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}