import React from 'react'
import CardHotel from './CardHotel.js'
import hotel1 from '../../assets/hotel2.png'
import hotelsStyle from '../Hotels/Hotels.module.css'
const Hotels = () => {
    const hotelData={
        Name:'Movempick',
        imageSrc: hotel1,
        Address:'Beirut Raoucheh',
        rate:3.8
    }
  return (
    <div className={hotelsStyle.container}>
      <h2>Most Popular Hotels</h2>
      <p className={hotelsStyle.slogan}>Discover the epitome of luxury. Here are our top 5 iconic hotels.</p>
      <div className={hotelsStyle.Hotels}>
      <CardHotel data={hotelData} />
      <CardHotel data={hotelData} />
      <CardHotel data={hotelData} />
      <CardHotel data={hotelData} />
      <CardHotel data={hotelData} />
</div>
    </div>
  )
}

export default Hotels
