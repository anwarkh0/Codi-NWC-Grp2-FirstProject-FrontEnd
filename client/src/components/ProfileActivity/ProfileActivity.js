import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Style from "./ProfileActivity.module.css";
import Pagination from "@mui/material/Pagination";

const mockData = [
  { id: "1", type: "Transaction", content: "Transaction 1 Details" },
  { id: "2", type: "Transaction", content: "Transaction 2 Details" },
  { id: "3", type: "Goal", content: "Goal 1 Details" },
  { id: "4", type: "Goal", content: "Goal 2 Details" },
  { id: "5", type: "Transaction", content: "Transaction 3 Details" },
  { id: "6", type: "Transaction", content: "Transaction 4 Details" },
  { id: "7", type: "Goal", content: "Goal 3 Details" },
  { id: "8", type: "Goal", content: "Goal 4 Details" },
  { id: "9", type: "Transaction", content: "Transaction 5 Details" },
  { id: "10", type: "Transaction", content: "Transaction 6 Details" },
  { id: "11", type: "Goal", content: "Goal 5 Details" },
  { id: "12", type: "Goal", content: "Goal 6 Details" },
  { id: "13", type: "Goal", content: "Goal 4 Details" },
  { id: "14", type: "Transaction", content: "Transaction 5 Details" },
  { id: "15", type: "Transaction", content: "Transaction 6 Details" },
  { id: "16", type: "Goal", content: "Goal 5 Details" },
  { id: "17", type: "Goal", content: "Goal 6 Details" },
  { id: "18", type: "Goal", content: "Goal 4 Details" },
  { id: "19", type: "Transaction", content: "Transaction 5 Details" },
  { id: "20", type: "Transaction", content: "Transaction 6 Details" },
  { id: "21", type: "Goal", content: "Goal 5 Details" },
  { id: "22", type: "Goal", content: "Goal 6 Details" },
];

const itemsPerPage = 5;

const  ProfileActivity = ({ userData}) => {
  const [value, setValue] = React.useState("Transaction");
  const [page, setPage] = React.useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setPage(1); 
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredData = mockData.filter((item) => item.type === value);

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "10px",
        typography: "body1",
        "& .MuiBox-root ": {
          width: "100%",
          height: "fit-content",
        },
        "& .MuiTabPanel-root": {
          width: "100%",
          backgroundColor: "white",
        },
        "& .MuiButtonBase-root": {
          color: "black",
        },
        "& .MuiTabPanel-root ": {
          borderRadius: "20px",
        },
        "& .  MuiTabs-indicator ": {
          marginLeft: "40px",
        },
        marginTop: "2rem",
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={(e, newValue) => setValue(newValue)}
            aria-label="lab API tabs example"
          >
            <Tab label="Transaction" value="Transaction" />
            <Tab label="Goal" value="Goal" />
          </TabList>
        </Box>

        <TabPanel key={value} value={value}>
          <h1 style={{ fontWeight: "bold", textAlign: "center" }}>
            {value === "Transaction" ? "History Transaction" : "History Goal"}
          </h1>
          {filteredData
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((item) => (
              <div key={item?.id}>

              </div>
            ))}
          <div className={Style.paginationn}>
            <Pagination
              count={Math.ceil(filteredData.length / itemsPerPage)}
              variant="outlined"
              color="primary"
              page={page}
              onChange={(e, newPage) => setPage(newPage)}
            />
          </div>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default ProfileActivity