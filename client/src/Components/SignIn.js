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

import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useResolvedPath } from 'react-router-dom';
import { fetchItems } from '../Redux/ItemSlice';
import { fetchCurrentUser, fetchUsers, getUserByUsername, setUser } from '../Redux/UserSlice';
import axios from 'axios';
import Navbar from './Navbar';
import sessionStorage from 'redux-persist/es/storage/session';
import { jwtDecode } from 'jwt-decode';

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

export default function SignIn() {//{setProfile}
  const navigate = useNavigate()
  const SignupSchema = Yup.object().shape({

    username: Yup.string()
      .min(4, "Username must be at least 4 characters")
      .max(20, "Username cannot exceed 20 characters")
      .matches(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores"
      )
      .required("Username is required"),

    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .max(16, "Password cannot exceed 16 characters")
      .matches(/[A-Z]/, "Password must contain at least one uppercase char")
      .required("Password is required"),

  });

  const formik = useFormik({
    initialValues: {
      username: "", password: ""
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      console.log('correct function');
      let [username, password, phone, area, city, street, profile, firstName] = []
      try {
        const response = await axios.post('https://localhost:7106/login', {
          "UserName": values.username,
          "Password": values.password
        })
        alert("You've logged in successfully")
        sessionStorage.setItem('isLoggedIn', 'true')
        const token = response.data
        sessionStorage.setItem('token', token)
        const decoded = jwtDecode(token)
        const JSONdecoder = JSON.parse(JSON.stringify(decoded))
        console.log('JSONdecoder:', JSONdecoder);
        let currentUserId;
        let lastName;

        let email;
        let dateOfBearth;
        let image;
        //let arr;
        // let username
        // let password
        // let phone
        // let area
        // let city
        // let street
        // let profile
        // let firstName
        for (const key in JSONdecoder) {
          console.log('key:', key);
          if (key.includes('nameidentifier'))
            currentUserId = JSONdecoder[key]
          if (key.includes('emailaddress'))
            email = JSONdecoder[key]
          if (key.includes('givenname')) {
            [username, password, phone, area, city, street, profile, firstName] = [...JSONdecoder[key]]

          }
          if (key.includes('surname'))
            lastName = JSONdecoder[key]
          if (key.includes('groupsid'))
            dateOfBearth = JSONdecoder[key]
        }
        console.log('currentuserid', currentUserId);
        sessionStorage.setItem('userId', +currentUserId)
        sessionStorage.setItem('email', email)
        sessionStorage.setItem('username', username)
        sessionStorage.setItem('password', password)
        sessionStorage.setItem('phone', phone)
        sessionStorage.setItem('area', area)
        sessionStorage.setItem('city', city)
        sessionStorage.setItem('street', street)
        sessionStorage.setItem('profile', profile)
        sessionStorage.setItem('firstName', firstName)
        sessionStorage.setItem('lastName', lastName)
        sessionStorage.setItem('dateOfBearth', dateOfBearth)
        console.log('in try:', response);
        //לכתוב את הפונקציה הזו 
        //clearLogFormInputs()

        console.log('before');
        const u = await axios.get(`https://localhost:7106/api/User/user/${username}`)
        const user = u.data
        console.log('user in sugnin', user);
        dispatch(setUser(user))
        navigate('/')
        return response.data// Assuming you want to return the data fron the response
      } catch (error) {
        alert('Incorrect username or password')
        console.log(error.message);
      }
    }
  });

  // const status = useSelector(state => state.user.status)
  // const user = useSelector(state => state.user.user)
  // const user = useSelector(state => state.user.user);
  // const statusUser = useSelector(state => state.user.status);
  const dispatch = useDispatch()

  // React.useEffect(() => {
  //   if (status !== 'fulfilled') {
  //     dispatch(fetchCurrentUser())
  //     console.log('redux user', user);
  //   }

  // }, [])

  const handleClose = () => {
    window.history.back();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    // dispatch(getUserByUsername(data.get('username')))

    const u = await axios.get(`https://localhost:7106/api/User/user/${data.get('username')}`)
    const user = u.data

    //user.profile=user.firstName[0]
    // setProfile(user.profile)
    // user.isLoggedIn=true
    // setUser(user)

    dispatch(setUser(user))

    // dispatch(setUser(user));

    // console.log('dispatch(currUser(user))',dispatch(currUser(user))); 
    console.log('user', u.data);

    // console.log('status', status);

    // navigate(`/navbar`)
    handleClose()
  };

  return (<>
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
            Sign in
          </Typography>

          <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(event) => { console.log(event.target.value) }}
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username && (
              <div className="error">{formik.errors.username}</div>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="error">{formik.errors.password}</div>
            )}
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, backgroundColor: 'orange' }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  </>
  );
}
