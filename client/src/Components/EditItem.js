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
import * as Yup from "yup";
import Navbar from './Navbar';
import axios from 'axios';
import styled from '@emotion/styled';
import { Dialog, DialogActions, FormControl, InputLabel, NativeSelect, Select } from '@mui/material';
import { Description } from '@mui/icons-material';
import { fetchCategories } from '../Redux/CategorySlice';
import { updateItem } from '../Redux/ItemSlice';



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
export default function EditItem({ setEdit, item }) {

  const user = useSelector(state => state.users.user)
  const dispatch = useDispatch()
  const [file, setFile] = React.useState()
  const [selectedImage, setSelectedImage] = React.useState()
  const disptach = useDispatch()
  const navigate = useNavigate()
  const [image, setImage] = React.useState()
  const [open, setOpen] = React.useState(true);
  const categories = useSelector(state => state.categories.categories);
  const status = useSelector(state => state.categories.status);

  const [subCategories, setSubCategories] = React.useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState(0);
  const [subCategoryId, setSubCategoryId] = React.useState(0);
  const [categoryId, setCategoryId] = React.useState()
  const [c1, setC1] = React.useState(0)
  const [c2, setC2] = React.useState(0)
  const [state, setState] = React.useState(item.state)
  const [defaultCategory, setDefaultCategory] = React.useState()
  const [defaultSubSubCategory, setDefaultSubSubCategory] = React.useState()

  React.useEffect(() => {
    if (status !== 'fulfilled')
      dispatch(fetchCategories())
    if (categories.length > 0) {
      console.log('length>0');
    }
  }, [])

  React.useEffect(() => {
    setSubCategories(categories.filter(x => +x.categoryParentId === +categories[0].id))

  }, [categories])

  const SignupSchema = Yup.object().shape({


    name: Yup.string()
      .min(2, "first name must be at least 2 characters")
      .max(20, "first name cannot exceed 20 characters")
      .required("first name is required"),

    description: Yup.string()
      .min(2, "description must be at least 2 characters")
      .max(1000, "description cannot exceed 20 characters")
      .required("description is required"),
  });

  // Initializing the useFormik hook.
  // It provides functions and state for the form.
  const formik = useFormik({
    initialValues: {
      name: item.name,
      description: item.description.replace('<br/>', '\n'),
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      if (file)
        values.fileImage = file.get('Image')
      else {
        values.fileImage = null
      }
      values.categoryId = categoryId
      values.state = state
      values.id = item.id
      if (item.askId)
        values.askId = sessionStorage.getItem('userId')
      else
        values.giveId = sessionStorage.getItem('userId')

      console.log('values', values);

      dispatch(updateItem(values))
      alert('Your details have been successfully updated')
      handleClose()
    }
  });

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
    console.log('e.target',e.target);
    const selectedFile = e.target.files[0];
    console.log('selectedFile',selectedFile);
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
  const getImage = async () => {
    try {
      let response = await axios.get(`https://localhost:7106/api/Item/getImage/${sessionStorage.getItem('profile')}`)
      setImage(response.data)
    } catch (error) {
      console.log(error.message);
    }
  }

  const handleClose = () => {
    setOpen(false);
    setEdit()
  };
  const changeSubCategory = (event) => {
    setSubCategoryId(+event.target.value)
    console.log('sub', +event.target.value);
    setCategoryId(+event.target.value)
  }
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
    setState(+event.target.value)
    console.log('state', +event.target.value);
  }
  React.useEffect(() => {
    if (subCategories.length > 0) {
      const firstSubSubCategory = categories.find(x => +x.categoryParentId === +subCategories[0].id)
      setCategoryId(+firstSubSubCategory.id)

      setCategoryId(item.category.id)
      setDefaultSubSubCategory(subCategories.findIndex(x => x.id === item.category.id))
      const subCategory = categories.find(x => x.id === item.category.categoryParentId)
      setDefaultCategory(categories.findIndex(x => x.id === subCategory.categoryParentId))
      console.log('categoryId', categoryId);
    }
  }, [subCategories])
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
                Edit item
              </Typography>
              <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="name"
                      autoFocus
                      {...formik.getFieldProps("name")}

                    />
                    {formik.touched.name && formik.errors.name && (
                      <div className="error">{formik.errors.name}</div>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      id="description"
                      label="description"
                      name="description"
                      autoComplete="description"
                      multiline
                      rows={4}
                      {...formik.getFieldProps("description")}
                    
                    />
                    {formik.touched.description && formik.errors.description && (
                      <div className="error">{formik.errors.description}</div>
                    )}
                  </Grid>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl >
                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Category
                      </InputLabel>
                      <NativeSelect
                        onChange={handleChange}
                        defaultValue={defaultCategory}
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
                    <Select native
                      defaultValue={defaultSubSubCategory}
                      id="grouped-native-select" label="Sub Category" onChange={changeSubCategory}>
                      {subCategories.map((s, i) => (
                        <optgroup key={s.id} value={s.id} label={s.name}>
                          {categories.map((v) => (
                            +v.categoryParentId === s.id && (
                              <option key={v.id} value={v.id}>-- {v.name}</option>
                            )
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                  </FormControl>
                  <Box sx={{ minWidth: 120 }}>
                    <FormControl >
                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        State
                      </InputLabel>
                      <NativeSelect
                        onChange={selectState}
                        defaultValue={state}
                        inputProps={{
                          name: 'state',
                          id: 'uncontrolled-native',
                        }}
                      >
                        <option value={0}>No Natter</option>
                        <option value={1}>like New</option>
                        <option value={2}>good And Above</option>
                        <option value={3}>slightly Damaged And Up</option>
                        <option value={4}>raw Material And Above</option>
                      </NativeSelect>
                    </FormControl>
                  </Box>
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
                      onChange={handleImageUpload}>Change/Add Image</Button>
                    <img src={selectedImage ? selectedImage : item.image ? item.image : ''} alt="Not Selected Image" style={{ maxWidth: '200px', marginTop: '10px' }} />
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
