import React, { useState } from 'react'
import Add from '../img/addAvatar.png';
import Google from '../img/google-icon.png';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile } from "firebase/auth";
import { auth, db, storage } from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

export const Register = () => {
  const [err, setErr] = useState(false);
  // Using the navigate hook to use navigation on the web
  const navigate = useNavigate();

  // On submit this function is called
  const handleSubmit = async (e) => {
    // Prevent default refreshing on submit
    e.preventDefault();
    // Get the data from the form
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    // Create a try catch 
    try{
      // Create a user instance in the firebase auth
      const res = await createUserWithEmailAndPassword(auth, email, password);
      // Create a storage ref for the photos
      const storageRef = ref(storage, displayName);
      // Upload the photo 
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (error) => {
          setErr(true);
        },
        // If successfull return a downloadURL, which we save to the photoURL
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            // After that we will save the user instance to the firestore database, into the users collection
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL
            });

            // Creating a collection for the chats that the user will have
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
    }catch(err){
      setErr(true);
    }
  }

  const handleGoogleClick = (e) => {
    e.preventDefault();
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider).then(async (result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;

      try {
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL
        });
        await setDoc(doc(db, "userChats", user.uid), {});
        navigate("/");
      } catch (err) {
        console.log(err);
      }
    }).catch((error) => {
      const errorMessage = error.message;
      console.log(errorMessage);
    });
  }

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">Lama chat</span>
        <span className="title">Register</span>
          <form onSubmit={handleSubmit}>
              <input type="text" placeholder="display name" />
              <input type="email" placeholder="email" />
              <input type="password" placeholder="password" />
              <input style={{display:"none"}} type="file" id="file"/>
              <label htmlFor="file">
                  <img src={Add} alt=""/>
                  <span>Add an avatar</span>
              </label>
              <button>Sign up</button>
              <button className="googleSignUp" onClick={handleGoogleClick}>
                <img src={Google} alt=""/>
                Sign up with Google
              </button>
              {err && <span>Something went wrong</span>}
          </form>
        <p>You already have an account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  )
}

export default Register;