import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getItemsGiveOfUser } from "../Redux/ItemSlice";
import Navbar from "./Navbar";
import { Box, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Rating, Tooltip, Typography } from "@mui/material";
import DeleteItem from "./DeleteItem";
import { useNavigate } from "react-router-dom";
import ItemOptions from "./ItemOptions";

const ItemsToGiveOfUser = () => {

    const itemsOfUser = useSelector(state => state.items.itemsGiveOfUser)
    const status = useSelector(state => state.items.statusItemsGiveOfUser)
    const user = useSelector((state) => state.users.user);
    const statusDelete=useSelector(state=>state.items.status)

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        if (status !== 'fulfilled') {
            dispatch(getItemsGiveOfUser(+sessionStorage.getItem('userId')))
            console.log('id', +sessionStorage.getItem('userId'));
        }
    }, [])

    const state2 = [
        'raw Material And Above',
        'slightly Damaged And Up',
        'good And Above',
        'like New'
    ]


    const date = (d) => {
        const date = new Date(d);

        const formattedDate = date.toLocaleDateString("he-IL");

        return formattedDate
    }
    const showDetails = (item) => {
        const objectToSend = { item, typeUser: 'give' };
        navigate(`/itemDetails/${item.id}/give`);
    }
    const Delete = (id) => {
        console.log(id);
    }
    
    return (<>
        <Navbar />
        {statusDelete =='pending'&& <p>המחיקה מתבצעת</p>}

        <Typography variant="h2" gutterBottom>my items</Typography>
        <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {status === 'idle' && <CircularProgress disableShrink />}
            {status !== 'idle' && itemsOfUser?.length === 0 &&
                <Typography variant="h6" gutterBottom>No items found</Typography>
            }
            {itemsOfUser?.length > 0 && itemsOfUser.map(item => {
                return <Box sx={{ maxWidth: 275, margin: '20px' }} key={item.id}>
                    <Card variant="outlined">
                        <React.Fragment>
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {item.name}
                                </Typography>
                                <Tooltip title={`state ${state2[item.state]}`} trigger="mouseOver" placement="top">  {/* העברת prop trigger ישירות */}
                                    <Rating className="rating" name="read-only" value={item.state} readOnly />
                                </Tooltip>
                                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                    {item.give.city}
                                </Typography>
                                <Typography variant="body2">
                                    {date(item.dateDelivery)}
                                </Typography>
                                <CardMedia
                                    component="img"
                                    height="194"
                                    image={item?.image}
                                    alt="Paella dish"
                                />
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={() => showDetails(item)}>Details</Button>
                                <ItemOptions item={item} Delete={(id) => Delete(id)}/>

                            </CardActions>
                        </React.Fragment>
                    </Card>
                </Box>
            })}
        </Container>
    </>);
}

export default ItemsToGiveOfUser;