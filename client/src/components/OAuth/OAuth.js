import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function OAuth() {

  const navigate = useNavigate();
    const handleGoogleClick = async ()=>{
        try{
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth,provider)
            console.log(result);
            
            const res = await axios.post(`${process.env.REACT_APP_SQL_API}/api/auth/google`, {
                name: result.user.displayName,
                email: result.user.email, 
                photo: result.user.photoURL
            })

            const data = await res.json();
            navigate("/");
        } catch (error) {
            console.log("could not sign in with google", error)
        }
    }
  return (
    <button onClick={handleGoogleClick} type='button' >
        Continue with google
    </button>
  )
}