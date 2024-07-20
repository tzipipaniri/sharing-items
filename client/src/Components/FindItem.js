import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory, fetchCategories, postCategory } from "../Redux/CategorySlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Items from "./Items";
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Container, CssBaseline, NativeSelect, TextField, createTheme } from "@mui/material";
import { Block } from "@mui/icons-material";
import '../Css/FindItem.css'
import Navbar from "./Navbar";
import SearchIcon from '@mui/icons-material/Search';
import { ThemeProvider } from "@emotion/react";

const FindItem = () => {

    const categories = useSelector(state => state.categories.categories);
    const status = useSelector(state => state.categories.status);
    const dispach = useDispatch();
    const refCategory = useRef();
    const navigate = useNavigate()
    const [selectedCategoryId, setSelectedCategoryId] = useState(0);
    const [subCategoryId, setSubCategoryId] = useState(0);
    const [subCategories, setSubCategories] = useState([]);
    const [state1, setState1] = useState(0)
    const [name, setName] = useState('All Items')
    const [area, setArea] = useState('All The Country')
    const [isFind, setIsFind] = useState(false)
    const [notFound, setNotFound] = useState(false)

    useEffect(() => {
        console.log('in useEffect');
        console.log('status: ', status);
        if (status !== 'fulfilled')
            dispach(fetchCategories())
    }, [])

    const handleChange = (event) => {
        setSelectedCategoryId(event.target.value);
        if (event.target.value > 0) {
            setSubCategories(
                categories.filter(x => x.categoryParentId === parseInt(event.target.value))
            );
        } else {
            setSubCategories([]);
        }
    };
    const selectState = (event) => {
        setState1(event.target.value)
    }
    const find = (typeItems, typeUser) => {
        const objectToSend1 = {
            name,
            selectedCategoryId,
            subCategoryId,
            state1,
            area,
            typeItems,
            typeUser
        };
        navigate('items', { state: { objectToSend1 } });
    }

    const changeSubCategory = (event) => {
        setSubCategoryId(event.target.value)
    }

    const handleFocus = (event) => {
        if (event.target.value === 'All Items')
            event.target.value = ''; 
    }

    const handleBlur = (event) => {
        if (event.target.value === '') { 
            event.target.value = 'All Items'; 
        }
        console.log(event.target.value);
        setName(event.target.value)
    }

    const handleFocusArea = (event) => {
        if (event.target.value === 'All The Country')
            event.target.value = ''; 
    }

    const handleBlurArea = (event) => {
        if (event.target.value === '') { 
            event.target.value = 'All The Country'; 
        }
        setArea(event.target.value)
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: '#1e88e5', 
            },
        },
    });
    
    return (

        <React.Fragment >
            <Navbar />
            <CssBaseline />
            <Container maxWidth="sm" id='FindItem' className="centered-container">
                <ThemeProvider theme={theme}>

                    <TextField
                        required
                        id="outlined-required"
                        label="Name"
                        defaultValue="All Items"
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                    />

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Category
                            </InputLabel>
                            <NativeSelect
                                onChange={handleChange}
                                defaultValue={0}
                                inputProps={{
                                    name: 'category',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option key={"all-categories"} value={0}>All Categories</option>
                                {categories && categories.map((c, i) => {
                                    return c.categoryParentId === 0 && (
                                        <option key={c.id} value={c.id}>
                                            {c.name}
                                        </option>
                                    );
                                })}
                            </NativeSelect>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                Sub Category
                            </InputLabel>
                            <NativeSelect
                                onChange={changeSubCategory}
                                defaultValue={0}
                                inputProps={{
                                    name: 'subCategory',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option key={"all-sub-categories"} value={0}>
                                    all sub categories        </option>
                                {subCategories.map((s, i) => (
                                    <React.Fragment key={i + 100}>
                                        <option key={s.id} value={s.id}>
                                            {s.name}
                                        </option>
                                        {categories.map((v) => (
                                            +v.categoryParentId === s.id && (
                                                <option key={v.id} value={v.id}>-- {v.name}</option>
                                            )
                                        ))}
                                    </React.Fragment>
                                ))}
                            </NativeSelect>
                        </FormControl>
                    </Box>

                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                State
                            </InputLabel>
                            <NativeSelect
                                onChange={selectState}
                                defaultValue={0}
                                inputProps={{
                                    name: 'state',
                                    id: 'uncontrolled-native',
                                }}
                            >
                                <option value={0}>NoNatter</option>
                                <option value={1}>raw Material And Above</option>
                                <option value={2}>slightly Damaged And Up</option>
                                <option value={3}>good And Above</option>
                                <option value={4}>like New</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>

                    <Box
                        component="form"
                        sx={{
                            '& > :not(style)': { m: 1, width: '25ch' },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <TextField
                            required
                            id="outlined-required"
                            label="Area"
                            defaultValue="All The Country"
                            onFocus={handleFocusArea}
                            onBlur={handleBlurArea}
                        />
                    </Box>
                    <Button variant="outlined" startIcon={<SearchIcon />} onClick={() => find('itemsToGive', 'give')} backgroundColor='orange'>Object to delivery</Button>
                    <Button variant="outlined" startIcon={<SearchIcon />} onClick={() => find('itemsToAsk', 'ask')}>Wanted items</Button>
                </ThemeProvider>
            </Container>
        </React.Fragment>
    );
};

export default FindItem;
