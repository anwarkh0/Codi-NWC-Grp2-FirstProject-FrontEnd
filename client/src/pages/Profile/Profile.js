import React, { useState, useContext, useEffect } from "react";
import EditProfile from "../../components/EditProfile/EditProfile";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import Navbar from "../../layouts/NavBar/NavBar";
import Sidebar from "../../layouts/sidebar/sidebar";
import ProfileDetails from "../../components/ProfileDetails/ProfileDetails";
import style from "./Profile.module.css";
import toast, { Toaster } from "react-hot-toast";
import ProfileActivity from "../../components/ProfileActivity/ProfileActivity";

const Profile = () => {
  const [overview, setOverview] = useState(true);
  const [edit, setEdit] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [networkError, setNetworkError] = useState(false);
  const [successEdit, setSuccessEdit] = useState(false);


const user = {
  id: 1 ,
  fullName : 'Wwouroud EL Khaldi',
  address : 'Bebnine, Akkar',
  dob : '01-12-2004',
  email : 'wouroud@gmail.com'
}

  useEffect(() => {
    const handleOffline = () => {
      setNetworkError(true);
    };
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("offline", handleOffline);
    };
  });

  useEffect(() => {
    // if (user) {
    //   console.log(user);
    //   if (user.id !== null) {
    //     console.log("start fetching");
    //     const getUser = async () => {
    //       setLoading(true);
    //       setNetworkError(false);
    //       setError(false);
    //       try {
    //         const userFetched = await apiCall({
    //           url: "api/auth/user",
    //           method: "post",
    //           data: { id: user.id },
    //         });
    //         if (userFetched) {
    //           setUserData(userFetched.User);
    //         }
    //         setLoading(false);
    //       } catch (error) {
    //         setLoading(false);
    //         if (error.message === "Network Error") {
    //           setNetworkError(true);
    //         } else {
    //           setError(true);
    //         }
    //       }
    //     };
    //     getUser();
    //   }
    // }
    setUserData(user)
  }, [successEdit]);
  
  useEffect(()=>{
    if (successEdit){
      toast.success(`User: ${user.fullName} has been edited successfuly`)
    }
  },[successEdit])

  const handleOverview = () => {
    setOverview(true);
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(true);
    setOverview(false);
  };

  return (
    <div
      style={{
        marginLeft: "4rem",
        marginRight: '0.3rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      <Sidebar />
      <Toaster/>
      <>
        <span
          style={{
            marginTop: "7rem",
            display: "flex",
            justifyContent: 'center',
            width: '90%'
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
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          boxShadow: '1px 1px 5px 5px #BABABA',
          width : '90%',
          borderRadius: '10px'
        }}>
          {overview && <ProfileActivity userData={userData && userData} />}

          {overview && <ProfileDetails userData={userData && userData} />}
        </div>
        {edit && (
          <span style={{
            display: 'flex',
            justifyContent: 'center',
            width : '90%'
          }}>
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
