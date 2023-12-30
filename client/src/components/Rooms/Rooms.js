import React, { useContext, useEffect, useState, useRef } from "react";
import roomsModule from "./rooms.module.css";
import down from "../../assets/images/down.png";
import up from "../../assets/images/up.png";
import { AuthContext } from "../../context/authContext";
import AddIcon from "@mui/icons-material/Add";
import RoomCard from "../roomCard/RoomCard.js";
import loadingImg from "../../assets/images/hotel-loading-gif.gif";
import UseApi from "../../hookes/useApi.js";
import { Button } from "@mui/material";
import RoomModal from "../RoomModal/RoomModal.js";
import DeleteRoomModal from "../RoomModal/DeleteRoomModal.js";
function Rooms({ idHotel }) {
  const { apiCall, loading, error } = UseApi();
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [roomData, setRoomData] = useState(null);
  const [oneRoom , setOneRoom] = useState()
  const [DefaultData, setDefaultData] = useState(false);
  const [successAdd, setSuccessAdd] = useState(false);
  const [successDelete , setSuccessDelete] = useState(false)
  const [active, setActive] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await apiCall({ url: "/room", method: "get" });
        setRoomData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, [successAdd , successDelete]);
  const handleClose = () => {
    setOpenAdd(false);
    setOpenDelete(false);
  };
  const clickHandler = () => {
    setActive(!active);
  };

  let ink = roomsModule.open;
  let arr = down;
  if (active) {
    ink = roomsModule.open;
    arr = up;
  } else {
    ink = roomsModule.closed;
    arr = down;
  }

  //creating sorting ref
  const defaultSorting = useRef();
  const priceSorting = useRef();
  const rateSorting = useRef();

  const sorting = (reference) => {
    if (reference.current.textContent === "Default")
      setDefaultData(!DefaultData);
    else if (reference.current.textContent === "Price")
      setRoomData(roomData.sort((a, b) => a.price - b.price));
    else if (reference.current.textContent === "Rate")
      setRoomData(roomData.sort((a, b) => a.Hotel.rate - b.Hotel.rate));
  };
  return (
    <>
      <div className={roomsModule.wrapper}>
        <h1 className={roomsModule.header}>All Rooms Section</h1>
        <p className={roomsModule.subHeader}>Enjoy our luxurious getaways</p>
        <div className={roomsModule.filter} onClick={clickHandler}>
          <div className={roomsModule.upper}>
            <p className={roomsModule.sort}>Sort by</p>
            <span className={roomsModule.downarrow}>
              <img src={arr} className={roomsModule.downarr} alt="downarrow" />
            </span>
          </div>
          <div className={ink}>
            <ul className={roomsModule.list}>
              <li className={roomsModule.listItem}>
                <a
                  href="#"
                  className={roomsModule.menuItem}
                  ref={defaultSorting}
                  onClick={() => sorting(defaultSorting)}
                >
                  Default
                </a>
              </li>
              <li className={roomsModule.listItem}>
                <a
                  href="#"
                  className={roomsModule.menuItem}
                  ref={priceSorting}
                  onClick={() => sorting(priceSorting)}
                >
                  Price
                </a>
              </li>
              <li className={roomsModule.listItem}>
                <a
                  href="#"
                  className={roomsModule.menuItem}
                  ref={rateSorting}
                  onClick={() => sorting(rateSorting)}
                >
                  Rate
                </a>
              </li>
            </ul>
          </div>
        </div>
        {user && (user.role === "Manager" || user.role === "Admin") ? (
          <span
            style={{
              width: "fitContent",
            }}
            onClick={() => setOpenAdd(true)}
          >
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                bgcolor: "#088395 !important",
                mt: "1rem",
                mb: "1rem",
              }}
            >
              Add Room
            </Button>
          </span>
        ) : (
          ""
        )}

        {!loading && roomData ? (
          <div className={roomsModule.gridView}>
            {roomData.map((room, index) => {
              return (
                <RoomCard
                  roomId={room.id}
                  image={room.RoomImages[0]}
                  quality={room.quality}
                  hotel={room.hotel}
                  price={room.price}
                  key={index}
                  setOpenDelete={setOpenDelete}
                  setOneRoom={setOneRoom}
                />
              );
            })}
          </div>
        ) : (
          <span className={roomsModule.loading}>
            <img
              src={loadingImg}
              style={{
                width: "15rem",
                height: "15rem",
              }}
              alt="loading"
            />
          </span>
        )}
      </div>
      <RoomModal
        type="add"
        open={openAdd}
        handleClose={handleClose}
        setSuccessAdd={setSuccessAdd}
      />
      <DeleteRoomModal openDelete={openDelete} handleClose={handleClose} setSuccessDelete={setSuccessDelete} selectedRowData={oneRoom}/>
    </>
  );
}

export default Rooms;
