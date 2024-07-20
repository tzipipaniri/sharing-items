import * as React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';

const PersonalArea = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <React.Fragment>
            {/* כפתור אזור אישי */}
            <Button aria-controls="personal-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
                Personal Area
            </Button>
            {/* תפריט האזור האישי */}
            <Menu
                id="personal-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {/* קישורים לאפשרויות באזור האישי */}
                <MenuItem component={Link} to="/giveItem" onClick={handleClose}>Give item</MenuItem>
                <MenuItem component={Link} to="/askItem" onClick={handleClose}>Ask item</MenuItem>
                <MenuItem component={Link} to="/itemsToGiveOfUser" onClick={handleClose}>I Give</MenuItem>
                <MenuItem component={Link} to="/itemsToAskOfUser" onClick={handleClose}>I Find</MenuItem>
                <MenuItem component={Link} to="/editUser" onClick={handleClose}>Edit User</MenuItem>
            </Menu>
        </React.Fragment>
    );
}

export default PersonalArea;