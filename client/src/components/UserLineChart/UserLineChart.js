import React from "react";
import { Line } from "react-chartjs-2";
import { Typography } from "@mui/material";

const UserLineChart = ({ userData }) => {
  if (!userData) {
    return null;
  }

  const createdAtValues = userData.map((user) => user.createdAt);

  const userCountByDay = createdAtValues.reduce((countByDay, date) => {
    const day = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    countByDay[day] = (countByDay[day] || 0) + 1;
    return countByDay;
  }, {});

  const labels = Object.keys(userCountByDay);
  const data = Object.values(userCountByDay);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Number of Users Added",
        data: data,
        fill: false,
        borderColor: "#FACD4B", 
        tension: 0.1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div
      style={{
        backgroundColor: "#212936",
        borderRadius: "20px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontFamily: "outfit",
          fontWeight: 500,
          color: "#BABABA",
          marginTop: "2rem",
          marginLeft: "2rem",
        }}
      >
        Users Added per day
      </Typography>
      <span
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {chartData && chartData.labels && chartData.labels.length > 0 ? (
          <Line data={chartData} options={chartOptions} />
        ) : (
          <p>No data available</p>
        )}
      </span>
    </div>
  );
};

export default UserLineChart;
