import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteItem from './DeleteItem';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { faIR } from '@mui/x-date-pickers/locales';
import EditItem from './EditItem';

const ItemOptions = ({ item, Delete }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isDelete, setIsDelete] = useState(false)
  const [isEdit, setIsEdit] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEdit(true)
    handleClose();
  };

  const handleDelete = () => {
    setIsDelete(true)
    console.log('delete in 3 points');
    handleClose();
  };

  const setDelete=()=>{
    setIsDelete(false)
  }

  const setEdit=()=>{
    setIsEdit(false)
  }

  return (
    <div>
      <IconButton
        aria-label="settings"
        aria-controls="item-options-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="item-options-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon />

          edit</MenuItem>
        <MenuItem onClick={handleDelete}>
          <DeleteIcon />
          delete</MenuItem>
      </Menu>
      {isDelete && <DeleteItem item={item} Delete={(id) => Delete(id)} setDelete={setDelete}/>}
      {isEdit && <EditItem setEdit={setEdit} item={item}/>}
    </div>
  );
};

export default ItemOptions;

