import React,{useEffect,useState} from "react";
import CardHotel from "./CardHotel";
import axios from 'axios'
// import hotel1 from "../../assets/images/hotel2.png";
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

  // const hotelData = [
  //   {
  //     name: "Movempick",
  //     imageSrc: hotel1,
  //     Address: "Beirut Raoucheh",
  //     rate: 3.8,
  //   },
  //   {
  //     name: "Movempick",
  //     imageSrc: hotel1,
  //     Address: "Beirut Raoucheh",
  //     rate: 5,
  //   },
  //   {
  //     name: "Movempick",
  //     imageSrc: hotel1,
  //     Address: "Beirut Raoucheh",
  //     rate: 4,
  //   },
  //   {
  //     name: "Movempick",
  //     imageSrc: hotel1,
  //     Address: "Beirut Raoucheh",
  //     rate: 3,
  //   },
  //   {
  //     name: "Movempick",
  //     imageSrc: hotel1,
  //     Address: "Beirut Raoucheh",
  //     rate: 4,
  //   },
  // ];

//   {
//   "name":"Lancaster",
//   "city":"Beirut",
//   "address":"raoucheh",
//   "rate":4,
//   "images":["imaag1","imag2"],
//   "rules":{"Icons":["ima1","im2"],"Desc":["desc1","desc2"]},
//   "roomNumber":2
// }



useEffect(() => {
  async function fetchData() {
  // console.log('fetch')
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



 let hotels = isLoading ? '' : hotelData.map((hotel) => <CardHotel data={hotel} />);
  return (
    !isLoading ?
    <div className={hotelsStyle.container}>
      <h1>Popular Hotels</h1>
      <p className={hotelsStyle.slogan}>
        Discover the epitome of luxury. Here are our hotels.
      </p>
      <div className={hotelsStyle.Hotels}>{hotels}</div>
    </div>
  :'Loading...');
};

export default Hotels;
