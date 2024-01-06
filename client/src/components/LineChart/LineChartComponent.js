import {
  FormControl,
  Typography,
  Select,
  MenuItem,
  Box,
  Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import UseApi from "../../hookes/useApi";

const LineChartComponent = () => {
  const { apiCall, loading, error } = UseApi();
  const [data, setData] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState( null);
  const [chartData, setChartData] = useState(null);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiCall({
          url: "statistic/revenue",
          method: "get",
        });
        setData(response.data);
        if (response.data.length > 0) {
          setSelectedHotel(response.data[0].hotelId); 
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleHotelChange = (event) => {
    const selectedHotelId = event.target.value;
    setSelectedHotel(selectedHotelId);
  };

  useEffect(() => {
    const selectedHotelData = data.find(
      (hotel) => hotel.hotelId === selectedHotel
    );
    if (selectedHotelData) {
    const dataObject = selectedHotelData.weeklyData;
    const uData = Object.values(dataObject).map(Number);
    const xLabels = Object.keys(dataObject).map((key) => `Week ${key}`);
    setChartData({ uData, xLabels });
    }
  }, [data, selectedHotel]);
  return (
    <>
      <Paper
        variant="outlined"
        sx={{
          borderColor: "#E6E9EE",
          width: "50%",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "start",
          borderRadius: "20px",
          "& img": { marginTop: "1.5rem" },
          "@media (max-width: 1570px)": {
            width: "100%",
            margin: "auto",
            marginBottom: "1em",
          },
          "@media (min-width: 475px)": {
            padding: "1.5em 2em",
          },
          "@media (min-width: 280px)": {
            padding: "1em 1em",
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
          Hotel's Weekly Revenue Last Month
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
            <Select
              value={selectedHotel}
              onChange={handleHotelChange}
            >
              
              {data.map((hotel) => (
                <MenuItem key={hotel.hotelId} value={hotel.hotelId}>
                  {hotel.hotelName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <div style={{ width: "100%" }}>
        {loading ? (
            <p>Loading...</p>
          ) : chartData && chartData.uData.length > 0 ? (
            <LineChart
              height={400}
              series={[{ data: chartData.uData, area: true, showMark: false }]}
              xAxis={[{ scaleType: "point", data: chartData.xLabels }]}
              sx={{
                ".MuiLineElement-root": {
                  display: "none",
                },
                ".css-q3wnbe-MuiResponsiveChart-container": {
                  width: "100%",
                },
                "& .MuiAreaElement-root": {
                  fill: "#088395",
                },
              }}
            />
          ) : (
            <p>No data available for the selected hotel.</p>
          )}
        </div>
      </Paper>
    </>
  );
};
export default LineChartComponent;
