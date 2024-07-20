import { Box, Button, Container, FormControl, Input, ListSubheader, MenuItem, NativeSelect, Select, TextField, Typography, createTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/CategorySlice";
import InputLabel from '@mui/material/InputLabel';
import { addProduct } from "../Redux/ItemSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import Navbar from "./Navbar";
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";



const GiveItem = () => {

    const SignupSchema = Yup.object().shape({
        name: Yup.string()
            .min(2, "name must be at least 2 characters")
            .max(20, "name cannot exceed 20 characters")
            .required("name is required"),

        description: Yup.string()
            .min(20, "description must be at least 20 characters")
            .max(100, "description cannot exceed 100 characters")
            .required("description is required"),

    });
  
    const formik = useFormik({
        initialValues: {
            name: "", description: ""
        },
        validationSchema: SignupSchema,
        onSubmit: (e) => {
            console.log('user.is', user?.id, typeof (user?.id));
            e.preventDefault();
            if (!sessionStorage.getItem('userId')) {
                alert('You must register/login')
                return
            }
            if (!isOk || file == null) {
                alert('All fields must be filled in correctly')
                return;
            }
            else {
                console.log("ok");
                setCurrItem({
                    Name: name,
                    Description: description,
                    FileImage: file.get('Image'),
                    GiveId: +(user?.id),
                    CategoryId: categoryId,
                    State: state,
                });
                console.log('currItem', currItem);

                console.log('true');
                const newItem = addProduct(setCurrItem)
                console.log('newItem', newItem);
                console.log('CurrItem:', currItem);
                dispach(addProduct({
                    Name: name,
                    Description: description,
                    FileImage: file.get('Image'),
                    GiveId: +sessionStorage.getItem('userId'),
                    CategoryId: categoryId,
                    State: state,
                }))
                alert('thunk you!!!')
                navigate('/')
            }
        }
    });

    const user = useSelector((state) => state.users.user);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState()
    const [selectedImage, setSelectedImage] = useState()
    const [giveId, setGiveId] = useState(0)
    const [categoryId, setCategoryId] = useState()
    const [state, setState] = useState(1)
    const [isOk, setIsOk] = useState(true);
    const [toAdd, setToAdd] = useState(false);
    const [currItem, setCurrItem] = useState({
        Name: '',
        Description: '',
        FileImage: '',
        GiveId: +(user?.id),
        CategoryId: 0,
        State: 0,
    })
    const [subCategoryId, setSubCategoryId] = useState(1);
    const [selectedCategoryId, setSelectedCategoryId] = useState(1);
    const [subCategories, setSubCategories] = useState([]);

    const name1 = useRef()
    const navigate = useNavigate()

    const categories = useSelector(state => state.categories.categories);
    const status = useSelector(state => state.categories.status);
    const dispach = useDispatch();
    useEffect(() => {
        if (status !== "fulfilled") {
            dispach(fetchCategories());
        }
    }, [status, dispach]);

    useEffect(() => {
        setSubCategories(categories.filter(x => +x.categoryParentId === +categories[0].id))

    }, [categories])

    useEffect(() => {
        if (subCategories.length > 0) {
            const firstSubSubCategory = categories.find(x => +x.categoryParentId === +subCategories[0].id)
            setCategoryId(+firstSubSubCategory.id)
            console.log('categoryId', categoryId);
        }
    }, [subCategories])

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
    const changeSubCategory = (event) => {
        setSubCategoryId(+event.target.value)
        console.log('sub', +event.target.value);
        setCategoryId(+event.target.value)
    }
    const selectState = (event) => {
        setState(+event.target.value)
        console.log('state', +event.target.value);
    }
    const handleImageUpload = (e) => {
        const selectedFile = e.target.files[0];
        const formData = new FormData();
        formData.append('Image', selectedFile);
        setFile(formData);
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedImage(reader.result);
        };

        if (selectedFile) {
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleBlur = (event) => {
        console.log('name', event.target.value);
        setName(event.target.value);
    }

    useEffect(() => {
        if (user !== null) {
            console.log('in give user', user);
        }
        else {
            console.log('in give no user', user);
        }
    }, [])

    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    return (
        <>
            <Navbar />
            <Container sx={{ margin: '5%' }}>
                <Typography variant="h2" gutterBottom>give item</Typography>

                <p>{user?.firstName}</p>

                <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>

                    <TextField

                        required
                        id="outlined-required"
                        label="Name"
                        onBlur={handleBlur}
                    />
                    {formik.touched.name && formik.errors.name && (
                        <div className="error">{formik.errors.name}</div>
                    )}

                    <TextField
                        id="filled-multiline-static"
                        label="Description"
                        placeholder="minimum 20 characters"
                        multiline
                        rows={4}
                        variant="filled"
                        onChange={(event) => {
                            console.log(event.target.value);
                            setDescription(event.target.value)
                        }}
                    />
                    {formik.touched.description && formik.errors.description && (
                        <div className="error">{formik.errors.description}</div>
                    )}
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl >
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

                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <InputLabel htmlFor="grouped-native-select">Sub Category</InputLabel>
                        <NativeSelect native defaultValue="" id="grouped-native-select" label="Sub Category" onChange={changeSubCategory}>
                            {subCategories.map((s, i) => (
                                <optgroup key={s.id} value={s.id} label={s.name}>
                                    {categories.map((v) => (
                                        +v.categoryParentId === s.id && (
                                            <option key={v.id} value={v.id}>-- {v.name}</option>
                                        )
                                    ))}
                                </optgroup>
                            ))}
                        </NativeSelect>
                    </FormControl>


                    <Box sx={{ minWidth: 120 }}>
                        <FormControl >
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
                                <option value={1}>raw Material And Above</option>
                                <option value={2}>slightly Damaged And Up</option>
                                <option value={3}>good And Above</option>
                                <option value={4}>like New</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <div>
                        <label htmlFor="image-upload"> choose image</label>
                        <br />
                        <VisuallyHiddenInput
                            type="file"
                            style={{ display: "none" }}
                            onChange={handleImageUpload}
                            accept="image/*"
                            sx={{
                                height: "100px",
                                bgcolor: "transparent",
                            }}
                            id="image-upload"
                        />
                        <Button onClick={() => document.getElementById('image-upload').click()}
                            component="label"
                            role={undefined}
                            variant="contained"
                            tabIndex={-1}
                            startIcon={<CloudUploadIcon />}
                            onChange={handleImageUpload}>Add Image</Button>

                        {selectedImage && (
                            <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
                        )}
                    </div>

                    <Button variant="contained"
                        type="submit"
                        endIcon={<SendIcon />}>Send</Button>
                </Box >
            </Container>
        </>);
}

export default GiveItem;