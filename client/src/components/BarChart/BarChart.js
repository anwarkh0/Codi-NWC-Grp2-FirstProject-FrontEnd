import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts";
import {
  FormControl,
  Typography,
  Select,
  MenuItem,
  Box,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import UseApi from "../../hookes/useApi";
import "./bar.css";

const chartSetting = {
  yAxis: [
    {
      label: "Number of rating",
    },
  ],
  width: 500,
  height: 300,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const valueFormatter = (value) => `${value} rates`;

export default function BarsDataset() {
  const { apiCall, loading, error } = UseApi();
  const [data, setData] = useState([]);
  const [dataset, setDataset] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiCall({
          url: "statistic/rate",
          method: "get",
        });
        setData(response.ratingsData);
        if (response.ratingsData.length > 0) {
          setSelectedHotel(response.ratingsData[0].id);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const selectedHotelData = data.find(
      (hotel) => hotel.id === selectedHotel
    );
    if (selectedHotelData) {
      const dataObject = selectedHotelData;
      const transformedData = [
        {
          star: "1 star",
          rate: Number(dataObject.rating_1_count),
        },
        {
          star: "2 star",
          rate: Number(dataObject.rating_2_count),
        },
        {
          star: "3 star",
          parrateis: Number(dataObject.rating_3_count),
        },
        {
          star: "4 star",
          rate: Number(dataObject.rating_4_count),
        },
        {
          star: "5 star",
          rate: Number(dataObject.rating_5_count),
        },
      ];
      setDataset(transformedData);
    }
  }, [data, selectedHotel]);
 console.log(dataset)
  const handleHotelChange = (event) => {
    const selectedHotelId = event.target.value;
    setSelectedHotel(selectedHotelId);
  };
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          borderColor: "#E6E9EE",
          width: "50%",
          height: "auto",
          borderRadius: "20px",
          "& img": { marginTop: "1.5rem" },
          "@media (max-width: 1570px)": {
            width: "100%",
            margin: "auto",
          },
          "@media (min-width: 280px)": {
            padding: "1.5em 2em",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            "@media (max-width: 700px)": {
              flexDirection: "column",
            },
          }}
        >
           <Typography
          variant="p"
          sx={{
            fontWeight: "bold",
            fontSize: "22px",
            "@media (max-width:700px)": {
              fontSize: "17px",
            },
          }}
        >
         Rating Distribution by Hotel.
        </Typography>
          <FormControl
            sx={{
              m: 1,
              minWidth: 120,
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: "#088395",
                },
              "& .MuiInputLabel-root.Mui-focused": {
                color: "#119c59",
              },
            }}
            size="small"
          >
            <Select value={selectedHotel} onChange={handleHotelChange}>
              {data.length > 0 ? (
                data.map((hotel) => (
                  <MenuItem key={hotel.id} value={hotel.id}>
                    {hotel.name}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">Loading...</MenuItem>
              )}
            </Select>
          </FormControl>
        </Box>
        
        {dataset.length > 0 && ( 
        <BarChart
          dataset={dataset} 
          xAxis={[{ scaleType: "band", dataKey: "star" }]}
          series={[
            { dataKey: "rate", label: "Number of Ratings", valueFormatter, color: "#088395" },
          ]}
          {...chartSetting}
        />
      )}

      </Paper>
    </>
  );
}
