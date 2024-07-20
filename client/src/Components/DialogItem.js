import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CardMedia, Typography } from '@mui/material';
import DeleteItem from './DeleteItem';
import { useSearchParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

export default function DialogItem({ item,typeUser }) {
    const [open, setOpen] = React.useState(false);
    const user=useSearchParams(state=>state.users.user)


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Details
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
                <DialogTitle>{item?.name}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span dangerouslySetInnerHTML={{ __html: (`description:${item?.description}`).replace(/\n/g, '<br/>') }} />

                    </DialogContentText>
                    <Typography variant="body2" color="text.secondary">
                        {`area:${item[typeUser].area}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">

                        {`${item[typeUser].city}`}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">

                        {`${item[typeUser].street}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {`${item[typeUser].firstName} ${item[typeUser].lastName}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">

                        {`${item[typeUser].phone}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">

                        {`${item[typeUser].email}`}
                    </Typography>
                    <CardMedia
                        component="img"
                        height="194"
                        image={item.image}
                        alt="Paella dish"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                    {item[typeUser] && item[typeUser]?.id === user?.id && <DeleteItem item={item}/>}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}