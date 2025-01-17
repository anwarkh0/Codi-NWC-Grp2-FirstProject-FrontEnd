import React, { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
import { Carousel } from "react-responsive-carousel";
import { Box } from "@mui/material";

const Carousell = ({images}) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      const newWid = window.innerWidth;
      setScreenWidth(newWid);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const divHeight = screenWidth < 300 ? '200px' : screenWidth < 600 ? '300px' : '500px'
  return (
    <Box 
    display='flex'
    flexDirection='column'
    justifyContent='center'
    width='100%'
    height= {divHeight}
    margin='2rem auto'
    >
      <Carousel
        width="100%"
        autoPlay={true}
        infiniteLoop={true}
        dynamicHeight={true}
        stopOnHover={true}
        showThumbs={false}
      >
        {images && images.map((image, index) => (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            height: divHeight
          }}
          key={index}
          >
            <img src={`${process.env.REACT_APP_SQL_API}/${image.icon}`} alt={`slide_${index}`} height={divHeight} style={{
              objectFit: 'cover',
              position: 'relative'
            }}/>
          </div>
        ))}
      </Carousel>
    </Box>
  );
};

export default Carousell;
