import Footer from "../../layouts/footer/Footer";
import React, { useContext, useEffect, useState , Suspense , lazy } from "react";
import roomsModule from "./rooms.module.css";
import down from "../../assets/images/down.png";
import up from "../../assets/images/up.png";
import { AuthContext } from "../../context/authContext";
import AddIcon from "@mui/icons-material/Add";
import loadingImg from "../../assets/images/hotel-loading-gif.gif";
import UseApi from "../../hookes/useApi.js";
import { Button } from "@mui/material";
import RoomModal from "../../components/RoomModal/RoomModal.js";
import DeleteRoomModal from "../../components/RoomModal/DeleteRoomModal.js";

const LazyRoomCard = lazy(() => import("../../components/roomCard/RoomCard"));

const RoomsPage = () => {
  const { apiCall, loading, error } = UseApi();
  const { user } = useContext(AuthContext);
  const [type, setType] = useState("default");
  const [roomData, setRoomData] = useState(null);
  const [oneRoom, setOneRoom] = useState();
  const [successAdd, setSuccessAdd] = useState(false);
  const [successDelete, setSuccessDelete] = useState(false);
  const [active, setActive] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await apiCall({
          url: "/room/order",
          method: "post",
          data: { type },
        });
        setRoomData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchRooms();
  }, [successAdd, successDelete, type]);

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

  return (
    <>
      <>
        <div className={roomsModule.wrapper}>
          <h1 className={roomsModule.header}>All Rooms Section</h1>
          <p className={roomsModule.subHeader}>Enjoy our luxurious getaways</p>
          <div className={roomsModule.filter} onClick={clickHandler}>
            <div className={roomsModule.upper}>
              <p className={roomsModule.sort}>Sort by</p>
              <span className={roomsModule.downarrow}>
                <img
                  src={arr}
                  className={roomsModule.downarr}
                  alt="downarrow"
                />
              </span>
            </div>
            <div className={ink}>
              <ul className={roomsModule.list}>
                <li className={roomsModule.listItem}>
                  <span
                    className={roomsModule.menuItem}
                    onClick={() => setType("quality")}
                  >
                    Quality
                  </span>
                </li>
                <li className={roomsModule.listItem}>
                  <span
                    className={roomsModule.menuItem}
                    onClick={() => setType("price")}
                  >
                    Price
                  </span>
                </li>
                <li className={roomsModule.listItem}>
                  <span
                    className={roomsModule.menuItem}
                    onClick={() => setType("guestNumber")}
                  >
                    Guets
                  </span>
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
                  <Suspense key={index}>
                    <LazyRoomCard
                      roomId={room.id}
                      image={room.RoomImages[0]}
                      quality={room.quality}
                      hotel={room.hotel}
                      price={room.price}
                      key={index}
                      setOpenDelete={setOpenDelete}
                      setOneRoom={setOneRoom}
                    />
                  </Suspense>
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
                loading="lazy"
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
        <DeleteRoomModal
          openDelete={openDelete}
          handleClose={handleClose}
          setSuccessDelete={setSuccessDelete}
          selectedRowData={oneRoom}
        />
      </>
      <Footer />
    </>
  );
};

export default RoomsPage;
