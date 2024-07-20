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
import { fetchUsers, postUser, setUser } from '../Redux/UserSlice';
import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

//11:00 10:20
//10:17-10:48

// Formik's useFormik hook provides all functionalities for form management.
import { useFormik } from "formik";
// Schema builder for value parsing and validation.
import * as Yup from "yup";
import Navbar from './Navbar';
import axios from 'axios';
import { DateField } from '@mui/x-date-pickers';
import styled from '@emotion/styled';

//להירשם sign up
//להתחבר sign in



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
export default function SignUp() {
  const [showPass, setShowPass] = React.useState(false)
  const [value, setValue] = React.useState()
  const [pass, setPass] = React.useState()
  const refDate = React.useRef()
  const [date, setDate] = React.useState(dayjs('2022-04-17'));
  const [file, setFile] = React.useState()
  const [selectedImage, setSelectedImage] = React.useState()

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
      .min(10, "phone must be at 10 characters")
      .max(10, "phone must be at 10 characters")
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
      userName: "", email: "", password: "",
      firstName: "", lastName: "", area: "", city: "", phone: "", street: "",
      // date: null
      dateOfBirth: '',
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      // For the demonstration purposes, we're console logging the values provided by user.
      //values.date = values.date.toISOString();
      console.log('onSubmit');
      console.log('file', file);
      if (file === undefined) {
        alert('add progile image')
        return
      }
      values.fileImage = file.get('Image')

      console.log("Submitted values:", values);




      //     values.preventDefault();
      //   const data = new FormData(values.currentTarget);
      //   //  console.log( 'firstName',data.get('firstName'))
      //   //  console.log( 'lastName',data.get('lastName'))
      //   //  console.log( 'userId',data.get('userId'))
      //   //  console.log( 'password',data.get('password'))
      //   //  console.log( 'email',data.get('email'))
      //   //  console.log( 'phone',data.get('phone'))
      //   //  console.log( 'city',data.get('city'))
      //   //  console.log( 'street',data.get('street'))
      //   //  console.log( 'numHouse',data.get('numHouse'))
      // console.log('add', dispatch(postUser({
      //     firstName:values['firstName'],
      //     lastName:values['lastName'],
      //     userName:values['userId'],
      //     password:values['password'],
      //     email:values['email'],
      //     phone:values['phone'],
      //     area:values['area'],
      //     city:values['city'],
      //     street:values['street']
      //   })));
      //   console.log('status',status);
      //   navigate(`/findItem`)


      try {
        const response = await axios.post('https://localhost:7106/api/User/ReceiveEmail', values.email, {
          headers: { 'Content-Type': 'application/json' }
        });
        // הצגת הודעה למשתמש על שליחת קוד
        // הפעלת ספירה לאחור

        // const { data: { code } } = response;

        // קבלת קוד מהמשתמש

        console.log(response.data.data);
        alert('send password to your email')
        setPass(response.data.data)
      } catch (error) {
        // טיפול בשגיאות
        console.log(error.message);
      }

      setShowPass(true)

      // המרת המחרוזת של dateOfBirth לאובייקט מסוג Date
      const dateOfBirth = new Date(values.dateOfBirth);

      // בדיקה אם ההמרה הצליחה
      if (!isNaN(dateOfBirth.getTime())) {
        // המרת התאריך לפורמט הנכון לשמירה במסד נתונים
        const formattedDateOfBirth = dateOfBirth.toISOString();

        // החלפת המחרוזת של dateOfBirth בתאריך המעובד
        values.dateOfBirth = formattedDateOfBirth;

        console.log("Submitted values:", values);
      } else {
        console.error("Invalid dateOfBirth format");
      }

      // הלוגיקה הנוספת שלך...


      console.log('values.dateOfBirth', values.dateOfBirth);//toISOString
      console.log('type', typeof values.dateOfBirth);
      // שאר הלוגיקה שלך... 


      console.log('values', values);
      setValue(values)

    }
  });

  const status = useSelector(state => state.users.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClose = () => {
    window.history.back();
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log('firstName', data.get('firstName'))
    console.log('lastName', data.get('lastName'))
    console.log('userId', data.get('userName'))
    console.log('password', data.get('password'))
    console.log('email', data.get('email'))
    console.log('phone', data.get('phone'))
    console.log('city', data.get('city'))
    console.log('street', data.get('street'))
    console.log('area', data.get('area'))
    const user = dispatch(postUser({
      firstName: data.get('firstName'),
      lastName: data.get('lastName'),
      userName: data.get('userName'),
      password: data.get('password'),
      email: data.get('email'),
      phone: data.get('phone'),
      area: data.get('area'),
      city: data.get('city'),
      street: data.get('street')
    }))
    console.log('add', user);
    setUser(user)
    console.log('status', status);
    // navigate(`/findItem`)
    handleClose()
  };

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
    // const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result);
    };

    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    }
  };

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
              Sign up
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
              {/* <form onSubmit={formik.handleSubmit}> */}
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
                  {/* <TextField margin="normal" id="date" label="Date Of Birth" type='date' name="dateOfBirth"
                    //  {...formik.getFieldProps("date")}
                    ref={refDate}
                  /> */}
                  <TextField
                    id="dateOfBirth"
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    value={formik.values.dateOfBirth} // שימוש בערך מסכימה
                    onChange={formik.handleChange} // טיפול בשינויים בערך
                    error={formik.touched.dateOfBirth && Boolean(formik.errors.dateOfBirth)} // הצגת שגיאות
                    helperText={formik.touched.dateOfBirth && formik.errors.dateOfBirth} // הצגת הודעת שגיאה
                  />
                </Grid>

                <div >
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
                    backgroundColor='orange'
                    onChange={handleImageUpload}>Add Image</Button>

                  {selectedImage && (
                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '200px', marginTop: '10px' }} />
                  )}
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
                sx={{ mt: 3, mb: 2 ,backgroundColor: 'orange'}}
                className="button input"
              >
                Sign Up
              </Button >
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/signIn" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
              {/* </form> */}

              {showPass && <TextField
                required
                fullWidth
                name="pass"
                label="pass"
                type="pass"
                id="pass"
                autoComplete="new-pass"
                onChange={async (event) => {
                  if (pass === event.target.value) {
                    let token = await dispatch(postUser(value))
                    // console.log('token in signup', token);
                    // localStorage.setItem('token', token)
                    alert('success')
                    console.log('token', token);
                    // dispatch(setUser())

                  // try {
                  //   const u = await axios.get(`https://localhost:7106/api/User/user/${token.payload.userName}`)
                  //   const user = u.data
                  //   dispatch(setUser(user))
                  // } catch (error) {
                  //   console.log(error.message);
                  // }
                  
                  navigate('/')
                   
                  }
                }}
              />}

            </Box>
          </Box>
          <Copyright sx={{ mt: 5 }} />
        </Container>
      </ThemeProvider >
    </>
  );
}
//תמי
//משיהיא עשתה אולי בדיקת תקינות  של שדה חובה על Autocomplete?

//  {/* <Grid item xs={12}>
//                   <LocalizationProvider dateAdapter={AdapterDayjs}>
//                     <DatePicker />
//                   </LocalizationProvider>
//                 </Grid> */}

