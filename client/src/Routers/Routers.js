import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from '../components/Header'
import Hotels from '../components/Hotels'
import Booking from '../components/BookingDetails.js'
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Header />}>
                </Route>
                <Route path='/room' ></Route>
                <Route path='/hotel' element={<Hotels />}></Route>
                <Route path='/booking' element={<Booking />}></Route>
            </Routes>
        </BrowserRouter>

    )
}

export default AppRouter;
