import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '../pages/home/Home'
import Hotels from '../pages/Hotels/hotels'
import Booking from '../components/Booking/BookingDetails'
import RoomsPage from '../pages/roomss/RoomsPage'
 import Info from '../pages/Info/Info'
 import Login from '../pages/log-in/Login.js'
 import SignUp from '../pages/sign-up/SignUp.js'
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Home />}></Route>
                <Route path='/room' element={<RoomsPage/>} ></Route>
                <Route path='/hotel' element={<Hotels />}></Route>
                <Route path='/booking' element={<Booking/>} ></Route> 
                <Route path='/signUp'  element={<SignUp />}></Route> 
                <Route path='/logIn' element={<Login />}></Route> 
                <Route path='info' element={<Info/>}></Route>  

            </Routes>
        </BrowserRouter>

    )
}

export default AppRouter;
