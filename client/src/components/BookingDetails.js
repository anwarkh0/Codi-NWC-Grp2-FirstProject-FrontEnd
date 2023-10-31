import React from 'react'
import styleBooking from '../style/BookingDetails.module.css'
const BookingDetails = () => {
  return (
    <div>
      <h1>RoomX</h1>
      <label id='Name' name='fullName' className={styleBooking.label} required>Full Name
      <p className={styleBooking.desc}>please give us the full name of the poeple stay at room</p>
      <input for='Name' type='text' className={styleBooking.inputField}/>
      </label>

      <label id='Email' name='email' className={styleBooking.label} required>Email address
      <p className={styleBooking.desc}>Your confirmation email goes here</p>
      <input for='Email' type='text' className={styleBooking.inputField}/>
      </label>

      <label id='MobileNumber' className={styleBooking.label} name='MobileNumber' required>Mobile Number
      <p className={styleBooking.desc}></p>
      <input for='MobileNumber' type='text' className={styleBooking.inputField}/>
      </label>
    </div>
  )
}

export default BookingDetails
