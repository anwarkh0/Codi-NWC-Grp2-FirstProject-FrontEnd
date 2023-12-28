import React from "react";

import { Box, Typography } from "@mui/material";
const Location = () => {
  const city = 'tripoli'
  const country = 'lebanon'
  return (
    <Box>
      <Typography
        variant="h5"
        component="h5"
        fontWeight="700"
        mt="4rem"
        mb='2rem'
        fontFamily="Helvetica Neue"
      >
        Our Location
      </Typography>
      <iframe
        style={{
          width : '100%',
          height: '400px',
          borderRadius: '10px',
        }}
        frameBorder="0"
        marginHeight="0"
        marginWidth="0"
        title="sad"
        src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=lebanon,%20tripoli(HotelXpress)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      >
        <a href="https://www.maps.ie/population/">Population mapping</a>
      </iframe>
    </Box>
  );
};

export default Location;
