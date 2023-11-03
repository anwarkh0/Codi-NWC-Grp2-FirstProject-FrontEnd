import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/HeroSection/HeroSection'
import Hotels from '../components/Hotels/Hotels'
import Booking from '../components/Booking/BookingDetails'
// import Reserve from '../components/Reserve.js'
// import SelectPerson from '../components/SelectPerson' 
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Header />}></Route>
                <Route path='/room' ></Route>
                <Route path='/hotel' element={<Hotels />}></Route>
                <Route path='/booking' element={<Booking/>} ></Route> 
                <Route path='/signUp'></Route>  {/* element={<SignUp />} */}
                <Route path='/logIn'></Route>  {/* element={<LogIn />} */}
                <Route path='info' ></Route>   {/* element={<AboutUs/>} */}

            </Routes>
        </BrowserRouter>

    )
}

export default AppRouter;
