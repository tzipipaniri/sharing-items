import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
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
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "../Redux/UserSlice";
import PersonalArea from "./PersonalArea";
import axios from "axios";


const Navbar = ({ user2}) => {
    const [pages, setPages] = React.useState(['signIn', 'signUp', 'findItem', 'categories', 'responses', 'about'])

    const settings = [
        'Give item', 'Ask item', 'I Give', 'I Find', 'Edit User'
    ];
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const [profile, setProfile] = React.useState()

    const user = useSelector((state) => state.users.user);
    const getImage = async () => {
        try {
            if (sessionStorage.getItem('profile')) {
                let response = await axios.get(`https://localhost:7106/api/User/getImage/${sessionStorage.getItem('profile')}`)
                setProfile(response.data)
            }
        } catch (error) {
            console.log(error.message);
        }
    }
    React.useEffect(() => {
        if (user !== null) {
            console.log('User:', user);
        } else {
            console.log('No user found');
        }
        getImage()
    }, [])

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (page) => {
        setAnchorElNav(null);
        navigate(`/${page}`)
    }

    const handleCloseUserMenu = (page) => {
        setAnchorElUser(null);
        switch (page) {
            case 'Give item':
                navigate(`/giveItem`)
                break
            case 'Ask item':
                navigate(`/askItem`)
                break
            case 'I Give':
                navigate(`/itemsToGiveOfUser`)
                break
            case 'I Find':
                navigate(`/itemsToAskOfUser`)
                break
            case 'Edit User':
                navigate(`/editUser`)
                break
            default:
                navigate('/')
        }
    };
    let profileValue
    React.useEffect(() => {
        profileValue = sessionStorage.getItem('profile');
        console.log(profileValue); 

    }, [])

    return (

        <AppBar position="static" sx={{ backgroundColor: 'orange' }}>
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
                        <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
                            <Logo
                                sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </Link>
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
                            fontSize: { xs: '1.5rem', md: '2rem' }, 
                        }}
                    >
                        <Link to="/" style={{ textDecoration: 'none', display: 'block' }}>
                            <Logo style={{ maxWidth: '100%', height: 'auto' }} />
                        </Link>

                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>

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
                        <Tooltip title={sessionStorage.getItem('firstName') ? sessionStorage.getItem('firstName') : ''}>
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src={profile} />
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
                            {sessionStorage.getItem('userId') &&
                                settings.map((setting) => (
                                    <MenuItem key={setting} onClick={() => handleCloseUserMenu(setting)}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                        </Menu>

                    </Box>


                </Toolbar>
            </Container >

        </AppBar >

    );
}

export default Navbar;