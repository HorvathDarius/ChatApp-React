import { React, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase';
import Google from '../img/google-icon.png';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export const Login = () => {

    const [err, setErr] = useState(false);
    const [notCreated, setNotCreated] = useState(false);
    // Using the navigate hook to use navigation on the web
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        // Create a try catch 
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (err) {
            setErr(true);
        }
    }

    const handleGoogleClick = (e) => {
        e.preventDefault();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider).then(async (result) => {
            const user = result.user;

            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);

            if(docSnap.data()){
                navigate("/");
            }else{
                setNotCreated(true);
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
                <span className="title">Login</span>
                {err && <span className="errorSpan">Something went wrong</span>}
                {notCreated && <span className="errorSpan">User doesn't exists. Please Register</span>}
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="email" />
                    <input type="password" placeholder="password" />
                    <button>Sign in</button>
                    <button className="googleSignUp" onClick={handleGoogleClick}>
                        <img src={Google} alt="" />
                        Log in with Google
                    </button>
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    )
}

export default Login;