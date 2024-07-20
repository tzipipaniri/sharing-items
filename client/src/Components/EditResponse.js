import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, postUser, updateUser } from '../Redux/UserSlice';
import { useNavigate } from 'react-router-dom';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import EditIcon from '@mui/icons-material/Edit';

// Formik's useFormik hook provides all functionalities for form management.
import { useFormik } from "formik";
// Schema builder for value parsing and validation.
import * as Yup from "yup";
import Navbar from './Navbar';
import axios from 'axios';
import styled from '@emotion/styled';
import { Dialog, DialogActions, FormControl, InputLabel, NativeSelect, Select } from '@mui/material';
import { Description } from '@mui/icons-material';
import { fetchCategories } from '../Redux/CategorySlice';
import { updateItem } from '../Redux/ItemSlice';
import { updateResponse } from '../Redux/ResponseSlice';



function Copyright(props) {



    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();
export default function EditResponse({ setEdit, response }) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(true);



    const SignupSchema = Yup.object().shape({


        title: Yup.string()
            .min(2, "title must be at least 2 characters")
            .max(20, "title cannot exceed 20 characters")
            .required("title is required"),

        content: Yup.string()
            .min(2, "content must be at least 2 characters")
            .max(1000, "content cannot exceed 20 characters")
            .required("content is required"),
    });

    // Initializing the useFormik hook.
    // It provides functions and state for the form.
    const formik = useFormik({
        initialValues: {
            title: response.title,
            content: response.content.replace('<br/>', '\n'),

        },
        validationSchema: SignupSchema,
        onSubmit: (values) => {
            values.id = response.id

            console.log('values', values);

            dispatch(updateResponse(values))
            alert('Your response has been successfully updated')
            handleClose()
        }
    });


    const handleClose = () => {
        setOpen(false);
        setEdit()
    };


    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <ThemeProvider theme={defaultTheme}>
                    <Container component="main" maxWidth="xs">
                        <CssBaseline />
                        <Box
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Edit Response
                            </Typography>
                            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            autoComplete="title"
                                            name="title"
                                            required
                                            fullWidth
                                            id="title"
                                            label="title"
                                            autoFocus
                                            {...formik.getFieldProps("title")}

                                        />
                                        {formik.touched.title && formik.errors.title && (
                                            <div className="error">{formik.errors.title}</div>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="content"
                                            label="content"
                                            name="content"
                                            autoComplete="content"
                                            multiline
                                            rows={4}
                                            {...formik.getFieldProps("content")}

                                        />
                                        {formik.touched.content && formik.errors.content && (
                                            <div className="error">{formik.errors.content}</div>
                                        )}
                                    </Grid>

                                    <Grid item xs={12}>
                                        <FormControlLabel
                                            control={<Checkbox value="allowExtraEmails" color="primary" />}
                                            label="I want to receive inspiration, marketing promotions and updates via email."
                                        />
                                    </Grid>
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    className="button input"
                                    endIcon={<SendIcon />}
                                >
                                    Save
                                </Button >
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link href="/signIn" variant="body2">
                                            Already have an account? Sign in
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                        <Copyright sx={{ mt: 5 }} />
                    </Container>
                </ThemeProvider>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
