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


// Formik's useFormik hook provides all functionalities for form management.
import { useFormik } from "formik";
import * as Yup from "yup";
import Navbar from './Navbar';
import axios from 'axios';
import styled from '@emotion/styled';



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


const defaultTheme = createTheme();
export default function EditUser() {

  const user = useSelector(state => state.users.user)
  const dispatch = useDispatch()
  const [file, setFile] = React.useState()
  const [selectedImage, setSelectedImage] = React.useState()
  const disptach = useDispatch()
  const navigate = useNavigate()
  const [profile,setProfile]=React.useState()

  const SignupSchema = Yup.object().shape({

    userName: Yup.string()
      .min(4, "userName must be at least 4 characters")
      .max(20, "userName cannot exceed 20 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "userName can only contain letters, numbers, and underscores"
      )
      .required("userName is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password cannot exceed 16 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase char")
      .required("Password is required"),

    firstName: Yup.string()
      .min(2, "first name must be at least 2 characters")
      .max(20, "first name cannot exceed 20 characters")
      .required("first name is required"),

    lastName: Yup.string()
      .min(2, "last name must be at least 2 characters")
      .max(20, "last name cannot exceed 20 characters")
      .required("last name is required"),
    area: Yup.string()
      .min(2, "area must be at least 2 characters")
      .max(20, "area cannot exceed 20 characters")
      .required("area is required"),
    city: Yup.string()
      .min(2, "city must be at least 2 characters")
      .max(20, "city cannot exceed 20 characters")
      .required("city is required"),
    phone: Yup.string()
      .min(10, "phone must be at least 10 characters")
      .max(10, "phone must be at least 10 characters")
      .matches(
        /^[0-9_]+$/,
        "phone can only contain numbers"
      )
      .required("phone is required"),
    street: Yup.string()
      .min(4, "street must be at least 4 characters")
      .max(20, "street cannot exceed 20 characters")
      .required("street is required"),
    dateOfBirth: Yup.date().required('Date of birth is required'),

  });

  // Initializing the useFormik hook.
  // It provides functions and state for the form.
  const formik = useFormik({
    initialValues: {
      userName: sessionStorage.getItem('username'), email: sessionStorage.getItem('email'), password: sessionStorage.getItem('password'),
      firstName: sessionStorage.getItem('firstName'), lastName: sessionStorage.getItem('lastName'), area: sessionStorage.getItem('area'), city: sessionStorage.getItem('city'), phone: sessionStorage.getItem('phone'), street: sessionStorage.getItem('street'),
      // dateOfBirth: user?.dateOfBirth.substring(0, 10)
      dateOfBirth: sessionStorage.getItem('dateOfBearth').substring(0, 10)

    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      // For the demonstration purposes, we're console logging the values provided by user.
      console.log("Submitted values:", values);

      values.dateOfBirth = new Date(values.dateOfBirth).toISOString()
      values.id = user?.id;
      values.fileImage = file ? file.get('Image') : null
      console.log('values', values);

      dispatch(updateUser(values))
      alert('Your details have been successfully updated')
      navigate('/')
      console.log('last');
    }
  });

  const handleClose = () => {
    window.history.back();
  }

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
  const getImage =async () => {
    try {
      let response = await axios.get(`https://localhost:7106/api/User/getImage/${sessionStorage.getItem('profile')}`)
      setProfile(response.data) 
    } catch (error) {
      console.log(error.message);
    }
  }
  React.useEffect(() => {
    console.log('user in  edit', user);
    console.log('sessionStorage', sessionStorage.getItem('dateOfBearth'));
    console.log('redux', user?.dateOfBirth);
    getImage()
  }, [])

  return (
    <>
      <Navbar />
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
              Edit user
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    {...formik.getFieldProps("firstName")}

                  />
                  {formik.touched.firstName && formik.errors.firstName && (
                    <div className="error">{formik.errors.firstName}</div>
                  )}
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    {...formik.getFieldProps("lastName")}

                  />
                  {formik.touched.lastName && formik.errors.lastName && (
                    <div className="error">{formik.errors.lastName}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="userName"
                    label="userName"
                    name="userName"
                    autoComplete="userName"
                    {...formik.getFieldProps("userName")}

                  />
                  {formik.touched.userName && formik.errors.userName && (
                    <div className="error">{formik.errors.userName}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="password"
                    label="password"
                    name="password"
                    autoComplete="password"
                    {...formik.getFieldProps("password")}

                  />
                  {formik.touched.password && formik.errors.password && (
                    <div className="error">{formik.errors.password}</div>
                  )}

                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    {...formik.getFieldProps("email")}

                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="error">{formik.errors.email}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="area"
                    label="area"
                    type="area"
                    id="area"
                    autoComplete="area"
                    {...formik.getFieldProps("area")}

                  />
                  {formik.touched.area && formik.errors.area && (
                    <div className="error">{formik.errors.area}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="city"
                    label="city"
                    type="city"
                    id="city"
                    autoComplete="new-city"
                    {...formik.getFieldProps("city")}

                  />
                  {formik.touched.city && formik.errors.city && (
                    <div className="error">{formik.errors.city}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="phone"
                    label="phone"
                    type="phone"
                    id="phone"
                    autoComplete="new-phone"
                    {...formik.getFieldProps("phone")}

                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="error">{formik.errors.phone}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="street"
                    label="street"
                    type="street"
                    id="street"
                    autoComplete="new-street"
                    {...formik.getFieldProps("street")}

                  />
                  {formik.touched.street && formik.errors.street && (
                    <div className="error">{formik.errors.street}</div>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    value={formik.values.dateOfBirth} 
                    onChange={formik.handleChange} 
                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)} // הצגת שגיאות
                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth} // הצגת הודעת שגיאה
                  />
                </Grid>
                <div >
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
                    onChange={handleImageUpload}>Change Profile Image</Button>
                  <img src={selectedImage ? selectedImage : profile} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
                </div>
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
                Send
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
    </>
  );
}
