import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { useDispatch, useSelector } from 'react-redux';
import { deleteItem } from '../Redux/ItemSlice';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';


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

export default function DeleteItem({ item,Delete ,setDelete}) {
    const [open, setOpen] = React.useState(true);//false
    const dispatch = useDispatch()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (isDelete) => {
        setOpen(false);
        if (isDelete === 'delete') {
            console.log('yes');
            dispatch(deleteItem(item.id))
            Delete(item.id)
        }
        else
            console.log('no');
        setDelete()
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
                    Delete Item
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    <p>Are you sure you want to delete the item? Did you deliver/receive it?</p>
                    An email will be sent to all users who have corresponded with you that the item has been delivered/received
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={() => handleClose('delete')}
                     variant="outlined" startIcon={<DeleteIcon />}>Delete</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}