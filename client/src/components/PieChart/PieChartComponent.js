import { Paper } from "@mui/material";
import {
  Typography,
  Box,
} from "@mui/material";
import { useEffect, useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import UseApi from "../../hookes/useApi";
import './pie.css'
const customColors = ["#088395", "#950883", "#938c08"];
 const PieChartComponent =()=> {

  const { apiCall, loading, error } = UseApi();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiCall({
          url: "statistic/top",
          method: "get",
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

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
          "@media (max-width:1570px)": {
            width: "100%",
            margin: "auto",
          },
          "@media (min-width: 280px)": {
            padding: "1.5em 2em",
          },
        }}
      >
          <Typography
            variant="p"
            sx={{
              fontWeight: 'bold', fontSize: '22px' ,
              "@media (max-width:700px)": {
                fontSize: "17px",
              },
            }}
          >
           Revenue Leaders: Last Month
          </Typography>
        <Box
          sx={{
            marginTop:"20px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Box>
            <p style={{ color: "#AFAFAF" }}>Top Revenue</p>
            <p>
            
              <strong>{users && users.length > 0 ? users[0].name:"" }</strong>
            </p>
          </Box>
          <Box>
            <p style={{ color: "#AFAFAF" }}>2nd Highest</p>{" "}
            <p>
              <strong>{users  && users.length > 1 ? users[1].name:"" }</strong>
            </p>
          </Box>
          <Box>
            <p style={{ color: "#AFAFAF" }}>3rd in Revenue</p>{" "}
            <p>
              <strong>{users && users.length > 2 ? users[2].name:"" }</strong>
            </p>
          </Box>
        </Box>
        <Box>
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: users && users.length > 0 ? users[0].totalRevenue:0,
                    label: users && users.length > 0? users[0].name:"",
                    color: customColors[0],
                  },
                  {
                    id: 1,
                    value:users && users.length > 1? users[1].totalRevenue:0,
                    label: users && users.length > 1 ? users[1].name:"",
                    color: customColors[1],
                  },
                  {
                    id: 2,
                    value:users && users.length > 2? users[2].totalRevenue:0,
                    label: users && users.length > 2? users[2].name:"",
                    color: customColors[2],
                  },
                ],
              },
            ]}
           
            sx={{
              "@media (max-width: 700px)": {
                ".MuiChartsLegend-root.MuiChartsLegend-column.css-1u0lry5-MuiChartsLegend-root":
                {
                  display: "none",
                },

            }}} 
            width={400}
            height={200}
          />
        </Box>
      </Paper>
      
    </>
  )
}
export default PieChartComponent