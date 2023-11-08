import React,{useEffect,useState} from "react";
import {useSearchParams} from 'react-router-dom'
import CardHotel from "./CardHotel";
import axios from 'axios'
import hotelsStyle from "./Hotels.module.css";
const Hotels = () => {
// const [hotelData,setHotelData]=useState([ {
//   "name":"Lancaster",
//   "city":"Beirut",
//   "address":"raoucheh",
//   "rate":4,
//   "images":["imaag1","imag2"],
//   "rules":{"Icons":["ima1","im2"],"Desc":["desc1","desc2"]},
//   "roomNumber":2
// }]);
const [hotelData,setHotelData] = useState([])
const [isLoading, setIsloading] = useState(true)
let [searchParams, setSearchParams] = useSearchParams();


useEffect(() => {
  async function fetchData() {
  try {
    const response = await axios.get("http://localhost:8000/hotel");
    if(response){
      setHotelData(response.data.data);
      setIsloading(false)
    }

  } catch (error) {
    console.error(error);
  }
}
  fetchData();
}, []); 

 let hotels = hotelData.map((hotel,index) => <CardHotel data={hotel} key={index} />);
  return (
    !isLoading ?
    <div className={hotelsStyle.container}>
      <h1>Popular Hotels</h1>
      <p className={hotelsStyle.slogan} >
        Discover the epitome of luxury. Here are our hotels.
      </p>
      <div className={hotelsStyle.Hotels}>{hotels}</div>
    </div>
  :'Loading...');
};

export default Hotels;
