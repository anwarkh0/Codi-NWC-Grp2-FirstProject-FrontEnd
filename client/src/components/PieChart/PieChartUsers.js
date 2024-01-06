import { Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import "./pie.css";
import UseApi from "../../hookes/useApi";

const customColors = ["#088395", "#950883"];
const PieChartUsers = () => {
  const { apiCall, loading, error } = UseApi();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiCall({
          url: "statistic/usersType",
          method: "get",
        });
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

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
            fontWeight: "bold",
            fontSize: "22px",
            "@media (max-width:700px)": {
              fontSize: "17px",
            },
          }}
        >
          Weekly New User Signup Analysis
        </Typography>
        <Box
          sx={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          {users.length > 0 && ( // Check if users array has data
            <>
              <Box>
                <p style={{ color: "#AFAFAF" }}>{users[0].role}</p>{" "}
                <p>
                  <strong>{users[0].count} users</strong>
                </p>
              </Box>
              <Box>
                {users.length > 1 && ( // Check if there's a second user
                  <>
                    <p style={{ color: "#AFAFAF" }}>{users[1].role}</p>{" "}
                    <p>
                      <strong>{users[1].count} users</strong>
                    </p>
                  </>
                )}
              </Box>
            </>
          )}
        </Box>
        <Box>
          <PieChart
            series={[
              {
                data: [
                  {
                    id: 0,
                    value: `${users.length > 0 ? users[0].count : ""}`,
                    label: "Manager",
                    color: customColors[0],
                  },
                  {
                    id: 1,
                    value: `${users.length > 1 ? users[1].count : ""}`,
                    label: users.length > 1 ? users[1].role : "",
                    color: customColors[1],
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
              },
            }}
            width={400}
            height={200}
          />
        </Box>
      </Paper>
    </>
  );
};
export default PieChartUsers;
