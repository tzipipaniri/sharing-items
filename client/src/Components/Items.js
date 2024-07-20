import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../Redux/ItemSlice";
import { fetchCategories } from "../Redux/CategorySlice";
import { fetchUsers } from "../Redux/UserSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Container, Rating, Tooltip, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import Box from '@mui/material/Box';
import '../Css/Items.css'
import Navbar from "./Navbar";
import DialogItem from "./DialogItem";
import DeleteItem from "./DeleteItem";
import ItemDetails from "./ItemDetails";
import ItemOptions from "./ItemOptions";
import { getMessagesItem, getMessagesOwnItem } from "../Redux/MessageSlice";

const useStyles = makeStyles((theme) => ({
    avatar: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    border: 1,
    width: '5rem',
    height: '5rem',
};

const Items = () => {
    const { state } = useLocation();
    const object = state.objectToSend1;
    const {
        name,
        selectedCategoryId,
        subCategoryId,
        state1,
        area,
        typeItems,
        typeUser
    } = object
    const items = useSelector(state => state.items[typeItems])
    const status = useSelector(state => state.items.status)
    const categories = useSelector(state => state.categories.categories)
    const statusCategory = useSelector(state => state.categories.status)
    const user = useSelector((state) => state.users.user);

    const dispach = useDispatch()
    const [selectedItems, setSelectedItems] = useState([])
    let [selectedCategory, setSelectedCategory] = useState([])
    const [arrIndex, setArrIndex] = useState([])

    const [itemsByName, setItemByName] = useState([])
    const [itemsByCategory, setItemByCategory] = useState([])
    const [itemsByState, setItemByState] = useState([])
    const [itemsByArea, setItemByArea] = useState([])
    const navigate = useNavigate()

    const state2 = [
        'raw Material And Above',
        'slightly Damaged And Up',
        'good And Above',
        'like New'
    ]

    const isValueInArray = (value, array) => {
        const ans = array.some(element => element === value)
        return ans;
    }
    const filterItemsByCategory = () => {
        let indexes = selectedCategory.map(x => +x.id)
        let temp2 = items.filter(x => isValueInArray(+x.categoryId, indexes))
        setItemByCategory(temp2)
    }
    const filterByName = () => {
       
        let tempItems = items.filter(x => x.name.include(name));
        console.log('tempItems: ', tempItems);
        setItemByName([...tempItems]);
    }

    const filterByState = () => {
        const selectedState = items.filter(x => +x.state === +state1)
        setItemByState(selectedState)
    }

    const filterUsers = () => {

        for (let i = 0; i < selectedItems.length; i++) {
            if (area !== "All The Country") {
                if (selectedItems[i][typeUser].area !== area && selectedItems[i][typeUser].city !== area) {
                    selectedItems.splice(i, 1);
                }
            }
        }
    }
    const filterItems = () => {
        console.log('items in filter items', items);
        console.log('name', items[0].name);
        setSelectedItems(items.filter(v =>
            (name === 'All Items' || v.name.includes(name)) &&
            isValueInArray(v.categoryId, selectedCategory)
            &&
            (state1 === 0 || +v.state === state1-1) &&
            (area === "All The Country" || v[typeUser].area === area || v[typeUser].city === area)
        ))
    }

    const filterCategories = () => {
        if (subCategoryId !== 0) {
            let s = categories.filter(x => +x.categoryParentId === +subCategoryId || +x.id === +subCategoryId)
            setSelectedCategory(s.map(x => x.id));
        }
        else if (selectedCategoryId !== 0) {
            let c = categories.filter(x => +x.categoryParentId === +selectedCategoryId || +x.id === +selectedCategoryId)
            const arrI = c.map(x => +x.id)
            let temp = categories.filter(x => isValueInArray(+x.categoryParentId, arrI))
            setSelectedCategory([...c, ...temp].map(x => x.id))
        }
        else {
            setSelectedCategory(categories.map(x => x.id))
        }
    }
    React.useEffect(() => {
        console.log('items useEffect');
        if (status !== 'fulfilled') {
            dispach(fetchItems())
            console.log('items in onload', items);
            console.log('status', status);
        }
        if (statusCategory !== 'fulfilled')
            dispach(fetchCategories())

        if (user !== null) {
            console.log('User in items', user);
        } else {
            console.log('No user found in items');
        }
    }, [])
    useEffect(() => {
       
        filterCategories()

    }, [statusCategory]) 

    useEffect(() => {
        if (items.length > 0) {
            console.log('finish filter category', selectedCategory);

            filterItems()

        }
    }, [selectedCategory])


    const isObjectInAllArrays = (object, arrays) => {
        return arrays.every(array => array.some(item => JSON.stringify(item) === JSON.stringify(object)));
    };

    const date = (d) => {
        const date = new Date(d);
        const formattedDate = date.toLocaleDateString("he-IL");
        console.log('response', formattedDate);
        return formattedDate
    }

    const theme = useTheme();
    const classes = useStyles();



    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );

    const card = (
        <React.Fragment>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Word of the Day
                </Typography>
                <Typography variant="h5" component="div">
                    be{bull}nev{bull}o{bull}lent
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    adjective
                </Typography>
                <Typography variant="body2">
                    well meaning and kindly.
                    <br />
                    {'"a benevolent smile"'}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </React.Fragment>
    );

    const showDetails = (item) => {

        const objectToSend = { item, typeUser };
        console.log('objectToSend2', objectToSend);
        navigate(`/itemDetails/${item.id}/${typeUser}`);
    }

    const Delete = (id) => {
        console.log(id);
        setSelectedItems(selectedItems.filter(x => x.id !== id))
    }

    return (
        <>
            <Navbar />
            <Container>
                <Box sx={{ width: '100%', maxWidth: 500 }}>
                    <Typography variant="h2" gutterBottom>items</Typography>
                </Box>
                <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                    {status === 'idle' && <CircularProgress disableShrink />}
                    {status !== 'idle' && selectedItems.length === 0 &&
                        <Typography variant="h6" gutterBottom>No items found</Typography>
                    }
                    {selectedItems.length > 0 && selectedItems.map((item, index) => {
                        return (
                            <Box sx={{ maxWidth: 275, margin: '20px' }} key={item.id}>
                                <Card variant="outlined">
                                    <React.Fragment>
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {item?.name}
                                            </Typography>
                                            state<Tooltip title={`state ${state2[item.state]}`} trigger="mouseOver">  {/* העברת prop trigger ישירות */}
                                                <Rating className="rating" name="read-only" value={item.state+1} readOnly />
                                            </Tooltip>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {item[typeUser].city}
                                            </Typography>
                                            <Typography variant="body2">
                                                {date(item.dateDelivery)}
                                            </Typography>
                                            {item?.image && <CardMedia
                                                component="img"
                                                height="194"
                                                image={item?.image}
                                                alt="Paella dish"
                                            />}
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="contained" onClick={() => showDetails(item)} backgroundColor='orange'>Details</Button>
                                            {sessionStorage.getItem('userId') == item[typeUser]?.id && <ItemOptions item={item} Delete={(id) => Delete(id)} />
                                            }
                                        </CardActions>
                                    </React.Fragment>
                                </Card>
                            </Box>
                        )
                    })}
                </Container>
            </Container>
        </>
    );
}

export default Items;