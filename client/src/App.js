import logo from './logo.svg';
import './App.css';
import Map from './Components/Map3'
import { fetchCategories } from './Redux/CategorySlice';
import AllCategories from './Components/AllCategories';
import axios from 'axios';
import { useEffect, useState } from 'react';
import SignUp from './Components/SignUp';
import Logo from './Components/Logo';
import { useDispatch, useSelector } from 'react-redux';
import Items from './Components/Items'
import SignIn from './Components/SignIn';
import Home from './Components/Home';
import { Link, Route, Routes } from 'react-router-dom';
import FindItem from './Components/FindItem';
import GiveItem from './Components/GiveItem';
import ParentCategories from './Components/ParentCategories';
import Navbar from './Components/Navbar';
import Items2 from './Components/Items2';
import Responses from './Components/Responses';
import AddResponse from './Components/AddResponse';
import ItemsByCategory from './Components/ItemsByCategory';
import PersonalArea from './Components/PersonalArea';
import ItemSlice, { fetchItems } from './Redux/ItemSlice';
import ItemsToGiveOfUser from './Components/ItemsToGiveOfUser';
import ItemDetails from './Components/ItemDetails';
import ItemsToAskOfUser from './Components/ItemsToAskOfUser';
import EditUser from './Components/EditUser';
import AskItem from './Components/AskItem';
import About from './Components/About';
import { fetchResponses } from './Redux/ResponseSlice';
import Main from './Components/Messages/Main';
import MapComponent from './Components/MapComponent';

function App() {
  const [user, setUser] = useState(undefined)
  const [profile, setProfile] = useState()
  const itemsToAsk = useSelector(state => state.items.itemsToAsk)
  const itemsToGive = useSelector(state => state.items.itemsToGive)
  const status = useSelector(state => state.items.status)
  const responses = useSelector(state => state.responses.responses)
  const statusResponse = useSelector(state => state.responses.status)
  const dispatch = useDispatch()
  useEffect(() => {
    console.log('app user', user);
  }, [user])

  useEffect(() => {
    //עובד
    // fetch("https://localhost:7106/api/Category")
    // .then((response) => response.json())
    // .then((data) => {
    //   // הצג את הנתונים
    //   console.log(data);
    // })
    // .catch((error) => {
    //   setError(error);
    // });

    if (status !== 'fulfilled')
      dispatch(fetchItems())
    // if (statusResponse !== 'fulfilled')
    //   dispatch(fetchResponses())
  }, []);
  return (
    <div className="App">
      {/* <Map location={'פיקא'}/> */}
      <Routes>
        <Route path="findItem" element={<FindItem />} />
        <Route path="/findItem/items" element={<Items />} />
        <Route path='giveItem' element={<GiveItem user={user} />} />
        <Route path='askItem' element={<AskItem user={user} />} />
        <Route path='signUp' element={<SignUp setUser={setUser} />} />
        <Route path='signIn' element={<SignIn setUser={setUser} />} />
        <Route path='categories' element={<ParentCategories />} />
        <Route path='itemsByCategory' element={<ItemsByCategory />} />
        <Route path='responses' element={<Responses />} />
        <Route path='responses/addResponse' element={<AddResponse />} />
        <Route path='navbar' element={<Navbar user2={user} profile={profile} />} />
        <Route path='itemsToGiveOfUser' element={<ItemsToGiveOfUser />} />
        <Route path='itemsToAskOfUser' element={<ItemsToAskOfUser />} />
        <Route path='personalArea' element={<PersonalArea />} />
        <Route path='editUser' element={<EditUser />} />
        <Route path='itemDetails/:itemId/:typeUser' element={<ItemDetails />} />
        <Route path='about' element={<About />} />
        <Route path='map/:location' element={<MapComponent />} />
        {/* <Route path='' element={<Map location='elad'/>} /> */}
        <Route path='' element={<Home />} />
        <Route path='*' element={<h1> not found </h1>} />
      </Routes >
      {/* <Main/> */}
    </div>
  );
}

export default App;
//קורות חיים 
//C# react sql C
//about דף

