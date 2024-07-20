import { Box, Button, CardMedia, Container, Dialog, IconButton, Rating, Stack, TableRow, ThemeProvider, Tooltip, Typography, createTheme, styled } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import '../Css/ItemDetails.css'
import { getMessagesItem, getMessagesOwnItem, setStatusMessagesItem, setStatusMessagesOwnItem } from "../Redux/MessageSlice";
import Main from "./Messages/Main";
import DialogMessage from "./DialogMessage";
import { fetchItemById } from "../Redux/ItemSlice";
import { purple } from "@mui/material/colors";



const ItemDetails = () => {
    const messagesOwnItem = useSelector(state => state.messages.messagesOwnItem)
    const statusMessagesOwnItem = useSelector(state => state.messages.statusMessagesOwnItem)
    const messagesItem = useSelector(state => state.messages.messagesItem)
    const statusMessagesItem = useSelector(state => state.messages.statusMessagesItem)
    const dispatch = useDispatch()
    const { itemId, typeUser } = useParams()
    const item = useSelector(state => state.items.selectedItem)
    const statusItem = useSelector(state => state.items.statusSelectedItem)
    console.log('item', item);
    console.log('userId', sessionStorage.getItem('userId'));
    console.log('typeUser', typeUser);
    const theme = createTheme({
        components: {
            MuiTypography: {
                defaultProps: {
                    variantMapping: {
                        h1: 'h2',
                        h2: 'h2',
                        h3: 'h2',
                        h4: 'h2',
                        h5: 'h2',
                        h6: 'h2',
                        subtitle1: 'h2',
                        subtitle2: 'h2',
                        body1: 'span',
                        body2: 'span',
                    },
                },
            },
        },
    });

    const triggerRef = useRef('none');

    const handleMouseEnter = () => {
        triggerRef.current.value = 'mouseOver';
    };

    const handleMouseLeave = () => {
        triggerRef.current.value = 'none';
    };

    const state2 = [
        'raw Material And Above',
        'slightly Damaged And Up',
        'good And Above',
        'like New'
    ]

    useEffect(() => {
        if (statusItem !== 'fulfilled')
            dispatch(fetchItemById(itemId))
        const currentUser = sessionStorage.getItem('userId')
        console.log('currentUser', currentUser);
        console.log('item.giveId', item.giveId);
        console.log('item.askId ', item.askId);
        if (item.giveId === currentUser || item.askId === currentUser) {
            dispatch(getMessagesItem(itemId, currentUser))
            console.log('dispatch messagesItem');
        }
        else {
            dispatch(getMessagesOwnItem(itemId, currentUser))
            console.log('dispatch messagesOwnItem');
        }
    }, [])

    const handleOpenInNewTab = () => {
        if (item.giveId) {
            console.log('item.give.city', item.give.city);
            window.open(`/map/${item.give.city} street ${item.give.street}`, '_blank');
        }
        else {
            window.open(`/map/${item.ask.city} street ${item.ask.street}`, '_blank');
        }
    };

    const ColorButton = styled(Button)(({ theme }) => ({
        color: theme.palette.getContrastText(purple[500]),
        backgroundColor: purple[500],
        '&:hover': {
            backgroundColor: purple[700],
        },
    }));


    return (
        <React.Fragment>
            <Navbar />
            <Container >
                <ThemeProvider theme={theme}>
                    <Typography variant="h2">{item?.name}</Typography>
                    <Typography variant="h6">
                        <span dangerouslySetInnerHTML={{ __html: (`${item?.description}`).replace(/\n/g, '<br/>') }} />

                    </Typography>
                    state<Tooltip title={`state ${state2[item?.state]}`} trigger="mouseOver">  {/* העברת prop trigger ישירות */}
                        <Rating className="rating" name="read-only" value={item?.state} readOnly />
                    </Tooltip>
                    {item && <Typography variant="h6">{item[typeUser]?.area}</Typography>}
                    {item && <Typography variant="h6">{item[typeUser]?.city}</Typography>}
                    {item && <Typography variant="h6">{item[typeUser]?.street}</Typography>}
                    <ColorButton variant="contained" onClick={handleOpenInNewTab}>To view the map</ColorButton>
                    <Container sx={{ height: '30%', width: '30%' }}>
                        {item?.image && <CardMedia
                            component="img"
                            image={item?.image}
                            alt="Paella dish"
                        />}
                    </Container>
                    {item[typeUser]?.firstName && <Typography variant="h6">{`${item[typeUser]?.firstName}`}</Typography>
                    }
                </ThemeProvider>
                {!sessionStorage.getItem('userId') && <Typography variant="h6">{`If you want to correspond you must register/log in`}</Typography>}
                
                {sessionStorage.getItem('userId') && sessionStorage.getItem('userId') == item[typeUser]?.id &&
                    <Stack spacing={2} direction="column">
                        {messagesOwnItem?.length > 0 && <Typography variant="h6">You can write to users who are interested in your item:</Typography>
                        }                        {item?.id && messagesOwnItem?.length && messagesOwnItem?.map(arr => {

                            return <Container sx={{ margin: '2%' }}>
                                <DialogMessage messages={arr} Item={item} get={arr[0].senderId} />
                            </Container>
                        }
                        )}
                    </Stack>
                }
                {sessionStorage.getItem('userId') && sessionStorage.getItem('userId') != item[typeUser]?.id &&
                    <Container>
                        {item?.id && <DialogMessage messages={messagesItem} Item={item} get={0} />}
                    </Container>
                }
            </Container>
        </React.Fragment >
    );
}

export default ItemDetails;
