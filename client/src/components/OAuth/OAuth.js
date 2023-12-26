import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../Firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import googleG from "../../assets/images/G.png";
import UseApi from "../../hookes/useApi";
import LoadingButton from "@mui/lab/LoadingButton";

export default function OAuth() {
  const {apiCall , loading , error} = UseApi()
  const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      console.log(result);

      const res = await apiCall({
        url : `${process.env.REACT_APP_SQL_API}/google`,
        method : 'post',
        data :         {
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }
      }
      );

      const data = await res.json();
      navigate("/");
    } catch (error) {
      console.log("could not sign in with google", error);
    }
  };
  return (
    <>
    {loading ? (
      <LoadingButton>
        
      </LoadingButton>
    ): (
      <Button
      variant="outlined"
      onClick={handleGoogleClick}
      startIcon={<img src={googleG} />}
      sx={{
        color: "black",
      }}
    >
      Login with Google
    </Button>
    )}
    </>
  );
}
