import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/CategorySlice";
import { fetchItems } from "../Redux/ItemSlice";
import { Avatar, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, Collapse, Container, IconButton, Rating, Tooltip, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import { red } from "@mui/material/colors";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Navbar from "./Navbar";
import DialogItem from "./DialogItem";
import DeleteItem from "./DeleteItem";
import ItemOptions from "./ItemOptions";
import { getMessagesItem, getMessagesOwnItem } from "../Redux/MessageSlice";



const ItemsByCategory = () => {
    const { state } = useLocation();
    const object = state.objectToSend;
    const {
        page,
        typeItems,
        typeUser
    } = object

    const [pages, setPages] = useState([])
    const [pagesIndex, setPagesIndex] = useState([])
    const [selectedCategory, setSelectedCategory] = useState([])
    const [itemsByCategory, setItemsByCategory] = useState([])
    const dispatch = useDispatch()
    const categories = useSelector(state => state.categories.categories)
    const status = useSelector(state => state.categories.status)
    const items = useSelector(state => state.items[typeItems])
    const statusItem = useSelector(state => state.items.status)
    const user = useSelector((state) => state.users.user);
    const navigate = useNavigate()

    const isValueInArray = (value, array) => {
        return array.some(element => element === value);
    }

    const selectCategory = () => {
        console.log('page', page);
        console.log('pages', pages);
        let selectedCategoryId = categories.find(x => x.name === page)
        selectedCategoryId = +selectedCategoryId.id

        console.log('selectedCategoryId', selectedCategoryId);

        let c = categories.filter(x => +x.categoryParentId === +selectedCategoryId || +x.id === +selectedCategoryId)
        console.log('selectedCategory', c);
        const arrIndex = c.map(x => +x.id)
        let temp = categories.filter(x => isValueInArray(+x.categoryParentId, arrIndex))
        console.log('temp', temp);
        setSelectedCategory([...c, ...temp])
    }


    useEffect(() => {
        console.log('page', page);
        console.log('in useEffect');
        console.log('status: ', status);
        if (status !== 'fulfilled') {

            dispatch(fetchCategories())
        }
        else {
            onload()
        }
        if (statusItem !== 'fulfilled') {
            dispatch(fetchItems())

        }
    }, [])

    const onload = () => {
        console.log('categories in navbar', categories);
        let categoryParent = categories.filter(x => +x.categoryParentId === 0)
        setPages(categoryParent.map(x => x.name));
        let indexes = categoryParent.map(x => +x.id)
        setPagesIndex(indexes)
        selectCategory()
    }

    useEffect(() => {
        if (categories.length > 0) {
            onload()
        }
    }, [status])

    const filterItemsByCategory = () => {

        let indexes = selectedCategory.map(x => +x.id)
        let temp2 = items.filter(x => isValueInArray(+x.categoryId, indexes))
        setItemsByCategory(temp2)
        console.log('arrIndex', indexes);
    }

    useEffect(() => {
        console.log('categoryParent', selectedCategory);
        filterItemsByCategory()
    }, [selectedCategory])



    const state2 = [
        'raw Material And Above',
        'slightly Damaged And Up',
        'good And Above',
        'like New'
    ]

    const date = (d) => {
        const date = new Date(d);
        const formattedDate = date.toLocaleDateString("he-IL");
        console.log('item', formattedDate);
        return formattedDate
    }

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const showDetails = (item) => {
        const objectToSend = { item, typeUser };
        console.log('objectToSend', objectToSend);
        navigate(`/itemDetails/${item.id}/${typeUser}`);
    }
    const Delete = (id) => {
        console.log(id);
        setItemsByCategory(itemsByCategory.filter(x => x.id !== id))
    }
    return (
        <>
            <Navbar />

            <Typography variant="h3" gutterBottom>
                items by category {page}
            </Typography>
            {status === 'idle' && <CircularProgress disableShrink />}
            {status !== 'idle' && itemsByCategory.length === 0 &&
                <Typography variant="h6" gutterBottom>No items found</Typography>
            }

            <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {itemsByCategory.length > 0 && itemsByCategory.map((item, index) => {
                    return (

                        <Box sx={{ maxWidth: 275, margin: '20px' }} key={item.id}>
                            <Card variant="outlined">
                                <React.Fragment>
                                    <CardContent>
                                        <Typography variant="h5" component="div" key={item.id}>
                                            {item.name}
                                        </Typography>
                                        <Tooltip title={`state ${state2[item.state]}`} trigger="mouseOver" placement="top">  {/* העברת prop trigger ישירות */}
                                            <Rating className="rating" name="read-only" value={item.state} readOnly />
                                        </Tooltip>
                                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                            {item[typeUser]?.city}
                                        </Typography>
                                        <Typography variant="body2">
                                            {date(item.dateDelivery)}
                                        </Typography>
                                        {item.image && <CardMedia
                                            component="img"
                                            height="194"
                                            image={item.image}
                                            alt="Paella dish"
                                        />}
                                    </CardContent>
                                    <CardActions>
                                        <Button variant="contained" onClick={() => showDetails(item)}>Details</Button>
                                        {sessionStorage.getItem('userId') !== null && <ItemOptions item={item} Delete={(id) => Delete(id)} />}
                                    </CardActions>
                                </React.Fragment>
                            </Card>
                        </Box>
                    )
                })}
            </Container>
        </>);
}

export default ItemsByCategory;