import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import PersonalArea from "./PersonalArea";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { fetchItems } from "../Redux/ItemSlice";
import Swiper from 'react-id-swiper';
import Box from '@mui/material/Box';
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Rating, Tooltip, Typography, useTheme } from '@mui/material';
import { useNavigate } from "react-router-dom";
import DeleteItem from "./DeleteItem";
import '../Css/Home.css';
import ItemOptions from "./ItemOptions";

const Home = () => {
    const image = "/images/background.jpg";
    let itemsToGive = useSelector(state => state.items.itemsToGive)
    const status = useSelector(state => state.items.status)
    const dispatch = useDispatch()
    const [newItemsGive, setNewItemsGive] = useState([])
    const divStyle = {
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
    const getLatestItems = () => {
        console.log('itemtogive in home', itemsToGive);
        const sortedItems = itemsToGive.slice().sort((a, b) => new Date(b.dateDelivery) - new Date(a.dateDelivery));

        setNewItemsGive(sortedItems.slice(0, 10));
        console.log('newItemsgive', newItemsGive);
    }
    useEffect(() => {
        if (status !== 'fulfilled')
            dispatch(fetchItems())
        getLatestItems()
    }, [])

    useEffect(() => {
        if (status === 'fulfilled')
            getLatestItems()
    }, [status])

    const params = {
        speed: 600,
        parallax: true,
        parallaxEl: {
            el: '.parallax-bg',
            value: '-23%'
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    }
    const state2 = [
        'raw Material And Above',
        'slightly Damaged And Up',
        'good And Above',
        'like New'
    ]
    const date = (d) => {
        const date = new Date(d);

        const formattedDate = date.toLocaleDateString("he-IL");

        console.log('response', formattedDate);
        return formattedDate
    }
    const navigate = useNavigate()
    const showDetails = (item) => {

        navigate(`/itemDetails/${item.id}/${'give'}`);
    }
    const Delete = (id) => {
        console.log(id);
        setNewItemsGive(newItemsGive.filter(x => x.id !== id))
    }
    return (
        <div>
            <Navbar />
            <Box sx={{ width: '100%', maxWidth: 500 }}>
                <Typography variant="h2" gutterBottom>new items</Typography>
            </Box>
            <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {newItemsGive.length > 0 && newItemsGive.map(item => {
                    return <Box sx={{ maxWidth: 275, margin: '20px' }} key={item.id}>
                        <Card variant="outlined">
                            <React.Fragment>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        {item?.name}
                                    </Typography>
                                    <Tooltip title={`state ${state2[item.state]}`} trigger="mouseOver">  {/* העברת prop trigger ישירות */}
                                        <Rating className="rating" name="read-only" value={item.state} readOnly />
                                    </Tooltip>
                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        {item?.give?.city}
                                    </Typography>
                                    <Typography variant="body2">
                                        {date(item?.dateDelivery)}
                                    </Typography>
                                    {item?.image && <CardMedia
                                        component="img"
                                        height="194"
                                        image={item?.image}
                                        alt="Paella dish"
                                    />}
                                </CardContent>
                                <CardActions>
                                    <Button variant="contained" onClick={() => showDetails(item)}>Details</Button>
                                    {sessionStorage.getItem('userId') && sessionStorage.getItem('userId') == item?.give?.id && <ItemOptions item={item} Delete={(id) => Delete(id)} />}
                                </CardActions>
                            </React.Fragment>
                        </Card>
                    </Box>
                })}
              
            </Container>
        </div>
    );
}

export default Home;

