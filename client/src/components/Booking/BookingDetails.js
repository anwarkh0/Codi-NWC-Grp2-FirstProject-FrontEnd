import React from 'react'
import styleBooking from '../Booking/BookingDetails.module.css'
const BookingDetails = () => {
  return (
    <section className={styleBooking.container}>
      <h1>RoomX</h1>
      <h3>Your details</h3>
      <form action='#' method='get'>
      <section className={styleBooking.section}>
        <label id='Name' name='fullName' className={styleBooking.label}>Full Name
          <span className={styleBooking.asterisk}> *</span>
        </label>
        <p className={styleBooking.desc}>please give us the full name of the poeple stay at room</p>
        <input required for='Name' type='text' className={styleBooking.inputField} />
      </section>

      <section className={styleBooking.section}>
        <label id='Email' name='email' className={styleBooking.label}>Email address
          <span className={styleBooking.asterisk}> *</span>
        </label>
        <p className={styleBooking.desc}>Your confirmation email goes here</p>
        <input  required for='Email' type='email' className={styleBooking.inputField} />
      </section>

      <section className={styleBooking.section}>
        <label id='MobileNumber' className={styleBooking.label} name='MobileNumber'>Mobile Number
          <span className={styleBooking.asterisk}> *</span>
        </label>
        <p className={styleBooking.desc}>We’ll only contact you in an emergency </p>
        <input  required for='MobileNumber' type='text' className={styleBooking.inputField} />
      </section>
      <button type='submit' className={styleBooking.submitButton}>Submit</button>
</form>
    </section>
  )
}

export default BookingDetails
