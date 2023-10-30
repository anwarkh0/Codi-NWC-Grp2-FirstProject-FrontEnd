import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/'>
                </Route>
                <Route path='/room' ></Route>
                <Route path='/hotel'></Route>
                <Route path='/booking'></Route>
            </Routes>
        </BrowserRouter>

    )
}

export default AppRouter;
