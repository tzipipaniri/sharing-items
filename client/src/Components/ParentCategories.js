import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/CategorySlice";
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { fetchItems } from "../Redux/ItemSlice";
import Logo from './Logo';
import { fetchUsers } from "../Redux/UserSlice";
import { makeStyles } from '@mui/styles';
import { Card, CardActions, CardContent, CardMedia, CssBaseline } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import '../Css/ParentCategories.css'

const ParentCategories = () => {
    const categories = useSelector(state => state.categories.categories)
    const status = useSelector(state => state.categories.status)
    const dispach = useDispatch()
    const [pages, setPages] = React.useState([])
    const [images, setImages] = React.useState([])
    const [pagesIndex, setPagesIndex] = React.useState([])
    const [page, setPage] = React.useState('')

    const [selectedCategory, setSelectedCategory] = React.useState([])
    const navigate = useNavigate()

    useEffect(() => {
        console.log('in useEffect');
        console.log('status: ', status);
        if (status !== 'fulfilled')
            dispach(fetchCategories())
    }, [])

    useEffect(() => {
        if (categories.length > 0) {
            console.log('categories in navbar', categories);
            let categoryParent = categories.filter(x => +x.categoryParentId === 0)
            setPages(categoryParent.map(x => x.name));
            setImages(categoryParent.map(x => x.image))
            let indexes = categoryParent.map(x => +x.id)
            setPagesIndex(indexes)
        }
    }, [categories])

    const isValueInArray = (value, array) => {
        return array.some(element => element === value);
    }

    // const filterItemsByCategory = () => {

    //     // const subCategories=categories.filter(x=>isValueInArray(+x.categoryParentId, pagesIndex))
    //     // const subCategoriesIndex=subCategories.map(x=>+x.id)
    //     // const susubCategories=categories.filter(x=>isValueInArray(+x.categoryParentId, subCategoriesIndex))
    //     // const susubCategoriesIndex=susubCategories.map(x=>+x.id)
    //     // const temp=items.filter(x=>isValueInArray(+x.categoryId,susubCategoriesIndex ))
    //     // setItemsByCategory(items)

    //     let indexes = selectedCategory.map(x => +x.id)
    //     let temp2 = items.filter(x => isValueInArray(+x.categoryId, indexes))
    //     setItemsByCategory(temp2)
    //     console.log('arrIndex', indexes);
    // }

    const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (page, typeItems, typeUser) => {
        setAnchorElNav(null);
        const objectToSend = {
            page,
            typeItems,
            typeUser
        };
        navigate('/itemsByCategory', { state: { objectToSend } });

        // let indexes=selectedCategory.map(x=>+x.id)
        // setCategoriesIndex(indexes)

        // console.log('categoryParent', selectedCategory);
        // filterItemsByCategory()
    };

    // useEffect(() => {
    //     console.log('categoryParent', selectedCategory);
    //     filterItemsByCategory()
    // }, [selectedCategory])

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    // const filterUsers = () => {
    //     let usersIndex = itemsByCategory.map(x => +x.userId);
    //     let usersTemp = [];
    //     for (let i = 0; i < usersIndex.length; i++) {
    //         usersTemp[i] = users.find(x => +x.id === usersIndex[i])
    //     }
    //     setSelectedUsers(usersTemp)
    //     console.log('selectusers1', selectedUsers);
    // }
    // useEffect(() => {
    //     filterUsers();
    // }, [itemsByCategory])


    // const useStyles = makeStyles((theme) => ({
    //     avatar: {
    //         width: theme.spacing(7),
    //         height: theme.spacing(7),
    //     },
    // }));

    // const classes = useStyles();

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );


    return (
        <>
            <Navbar />
            {/* <Link to='/itemsByCategory'>try</Link> */}
            {/* <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Logo />
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            <Logo />
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => handleCloseNavMenu(page)}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar> */}
            <React.Fragment>
                <CssBaseline />
               
                {/* <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>         */}
        <Container maxWidth="lg" sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

                        {
                    pages.map(((page, i) => (

                        //             <Card sx={{ maxWidth: 275, margin: '20px' }} key={i} className='c'>
                        //                 <CardContent>
                        //                     {/* <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        //     Word of the Day 
                        // </Typography> */}
                        //                     <Typography variant="h5" component="div">
                        //                         {/* be{bull}nev{bull}o{bull}lent  */}
                        //                         {page}
                        //                     </Typography>
                        //                     <img src={images[i]} />
                        //                     {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        //     adjective
                        // </Typography> */}
                        //                     {/* <Typography variant="body2">
                        //     well meaning and kindly.
                        //     <br />
                        //     {'"a benevolent smile"'}
                        // </Typography> */}
                        //                 </CardContent>
                        //                 <CardActions>
                        //                     <Button size="small" onClick={() => handleCloseNavMenu(page, 'itemsToGive', 'give')}>look items</Button>
                        //                     <Button size="small" onClick={() => handleCloseNavMenu(page, 'itemsToAsk', 'ask')}>Wanted items</Button>
                        //                 </CardActions>
                        //             </Card>

                        <Card sx={{ maxWidth: 345, margin: '20px'  }}>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={images[i]}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {page}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => handleCloseNavMenu(page, 'itemsToGive', 'give')}>look items</Button>
                                <Button size="small" onClick={() => handleCloseNavMenu(page, 'itemsToAsk', 'ask')}>Wanted items</Button>
                            </CardActions>
                        </Card>

                    )))
                }


                    {/* 
            {status === 'idle' && <div>לא נשלפו עדין פריטים</div>}
            {itemsByCategory.length > 0 && itemsByCategory.map((item, index) => {
                return (
                    <Container key={item.id} className="item">
                        <Typography variant="body1">name {item.name}</Typography>
                        <Typography variant="body1">state {state2[item.state]}</Typography>
                        <Typography variant="body1">city {item.user.city}</Typography>
                        <Typography variant="body1">date {date(item.dateDelivery)}</Typography>
                        <Typography variant="body1">description {item.description}</Typography>
                        <Typography variant="body1">first name {item.user.firstName}</Typography>
                        <Typography variant="body1">item.id {item.id}</Typography>
                        <Avatar alt="profile image" src={item.pic} />
                    </Container>
                )
            })} */}

                </Container>
            </React.Fragment>
        </>
    );
}

export default ParentCategories;