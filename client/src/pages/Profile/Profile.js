import React, { useState, useContext, useEffect } from "react";
import EditProfile from "../../components/EditProfile/EditProfile";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Navbar from "../../layouts/NavBar/NavBar";
import Sidebar from "../../layouts/sidebar/sidebar";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import toast, { Toaster } from "react-hot-toast";
import ProfileActivity from "../../components/ProfileActivity/ProfileActivity";
import { AuthContext } from "../../context/authContext";
import UseApi from "../../hookes/useApi";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [overview, setOverview] = useState(true);
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState();
  const [networkError, setNetworkError] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);
  const { apiCall, loading, error } = UseApi();

  useEffect(() => {
    const handleOffline = () => {
      setNetworkError(true);
    };
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  });

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

  useEffect(() => {
    const fetchUser = async () => {
      const response = await apiCall({
        method: "post",
        url: "/user/getOne",
        data: {
          id: user && user.id,
        },
      });
      setUserData(response);
    };
    fetchUser();
  }, [successEdit, !user]);

  useEffect(() => {
    if (successEdit) {
      toast.success(
        `User: ${
          userData && userData.firstName + " " + userData.lastName
        } has been edited successfuly`
      );
    }
  }, [successEdit]);

  const handleOverview = () => {
    setOverview(true);
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
    setOverview(false);
  };

  const flex = screenWidth < 600 ? "column" : "row";
  const leftSpanWidth = screenWidth < 600 ? "100%" : "55%";
  const rightSpanWidth = screenWidth < 600 ? "100%" : "40%";
  const marginLeft = user && user.role !== "Customer" ? "4rem" : "0";
  const marginRight = user && user.role !== "Customer" ? "0.3rem" : "0";

  return (
    <div
      style={{
        marginLeft: marginLeft,
        marginRight: marginRight,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Helmet>
        <title>Profile Settings</title>
        <meta
          name="description"
          content="Manage your profile settings and preferences within Hotel Xpress's dashboard.
           Update personal information, security settings, and customize your user experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content="All Rooms Overview" />
        <meta
          property="og:description"
          content="VManage your profile settings and preferences within Hotel Xpress's dashboard.
          Update personal information, security settings, and customize your user experience."
        />
      </Helmet>
      {user && user.role !== "Customer" ? <Sidebar /> : <Navbar />}
      <Toaster />
      <>
        <span
          style={{
            marginTop: "7rem",
            display: "flex",
            justifyContent: "center",
            width: "90%",
          }}
        >
          <ProfileCard
            handleOverview={handleOverview}
            overview={overview}
            handleEdit={handleEdit}
            edit={edit}
            userData={userData && userData}
          />
        </span>
        {overview && (
          <div
            style={{
              width: "90%",
              display: "flex",
              flexDirection: flex,
              columnGap: "10%",
            }}
          >
            <span
              style={{
                display: "flex",
                boxShadow: "1px 1px 5px 5px #BABABA",
                width: leftSpanWidth,
                borderRadius: "10px",
                marginBottom: "2rem",
              }}
            >
              <ProfileActivity userData={userData && userData} />
            </span>
            <span
              style={{
                display: "flex",
                boxShadow: "1px 1px 5px 5px #BABABA",
                width: rightSpanWidth,
                borderRadius: "10px",
                height: "19rem",
              }}
            >
              <ProfileDetails userData={userData && userData} />
            </span>
          </div>
        )}
        {edit && (
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              width: "90%",
            }}
          >
            <EditProfile
              userData={userData && userData}
              setSuccessEdit={setSuccessEdit}
            />
          </span>
        )}
      </>
    </div>
  );
};

export default Profile;
