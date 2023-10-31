import React from 'react'
import CardHotel from '../components/CardHotel.js'
import hotel1 from '../assets/hotel1.png'
import hotelsStyle from '../style/Hotels.module.css'
const Hotels = () => {
    const hotelData={
        Name:'Movempick',
        imageSrc: hotel1,
        Address:'Beirut Raoucheh',
        rate:4.8
    }
  return (
    <div>
      <h2>Most Popular Hotels</h2>
      <p>Discover the epitome of luxury. Here are our top 5 iconic hotels.</p>
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
