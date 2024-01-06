import Location from "../../components/Location/Location";
import Footer from "../../layouts/footer/Footer";
import React, { useEffect, useState } from "react";
import Aboutus from "../../assets/images/HotelAboutUs2.jpg";
import { Box, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
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
  return (
    <>
    <Helmet>
        <title>About Hotel Xpress</title>
        <meta
          name="description"
          content="Learn about hotel express and out commitment."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="About Hotel Xpress" />
        <meta
          property="og:description"
          content="Learn about hotel express and out commitment."
        />
      </Helmet>
      <Box
        style={{
          width: "70vw",
          margin: "2rem auto",
        }}
      >
        <Typography
          variant="h4"
          component="h4"
          fontWeight="700"
          mt="10rem"
          fontFamily="Helvetica Neue"
        >
          About Hotel Express
        </Typography>
        <section
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: screenWidth < 1000 ? "column" : "row",
            columnGap: "2rem",
            rowGap: "2rem",
          }}
        >
          <Typography
            fontSize="1rem"
            color="#585858"
            width={screenWidth < 1000 ? "100%" : "50%"}
            fontFamily="Helvetica Neue"
          >
            At HotelXpress, we specialize in connecting you to the ideal room
            for your stay, right within the heart of exceptional hotels. We're
            dedicated to simplifying your search for the perfect space, offering
            a wide selection of individual rooms tailored to your preferences.
            Discover comfort, convenience, and quality lodging options, all at
            your fingertips.
          </Typography>
          <img
            alt="hotel"
            src={Aboutus}
            width={screenWidth < 1000 ? "100%" : "50%"}
            style={{
              borderRadius: "10px",
              display: screenWidth < 400 ? "none" : "flexf",
            }}
          ></img>
        </section>
        <section>
          <Typography
            variant="h5"
            component="h5"
            fontWeight="700"
            mt="4rem"
            fontFamily="Helvetica Neue"
          >
            Our Commitment
          </Typography>
          <Typography
            fontSize="1rem"
            color="#585858"
            width="100%"
            fontFamily="Helvetica Neue"
            mt="1rem"
          >
            we are dedicated to make your booking experience effortless while
            providing an extensive array of options and unmatched convenience.
            Carefully curated, our selection includes a diverse range of hotels,
            each meticulously chosen to offer you an extraordinary stay. From
            intimate boutique accommodations to opulent resorts, we've
            handpicked every establishment to ensure that each stay stands out
            as a distinct and unforgettable experience.
          </Typography>
        </section>
      <Location location="tripoli" />
      </Box>
      <Footer />
    </>
  );
};

export default AboutUs;
