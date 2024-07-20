import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import Main from './Messages/Main';
import { Height } from '@mui/icons-material';

const emails = ['username@gmail.com', 'user02@gmail.com'];

function SimpleDialog(props) {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} open={open} color='orange'>
           
            <Main messages={props.messages} Item={props.Item} get={props.get} />
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo({ messages, Item, get }) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState(emails[1]);
    const [to, setTo] = React.useState()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
    };

    React.useEffect(() => {
        if (messages?.length > 0) {
            if (sessionStorage.getItem('userId') != messages[0].senderId)
                setTo(messages[0].sender.firstName)
            else
                setTo(messages[0].getting.firstName)
        }
        else if(Item.ask.firstName)
            setTo(Item.askId ? Item.ask.firstName : Item.give.firstName)
    }, [])

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}
                sx={{
                    color: 'white',
                    borderColor: 'white',
                    bgcolor: 'orange',
                    '&:hover': { 
                        bgcolor: 'darkblue',
                        borderColor: 'darkblue'
                    }
                }}
            >
                Send message to {to}
            </Button>
            <SimpleDialog
                selectedValue={selectedValue}
                open={open}
                onClose={handleClose}
                messages={messages}
                Item={Item}
                get={get}
            />
        </div>
    );
}