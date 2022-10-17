import { signOut } from 'firebase/auth'
import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { auth } from '../firebase'

const Navbar = () => {
  // Accessing the user from the AuthContext, the global user which we can see from everywhere
  const {currentUser} = useContext(AuthContext);

  return (
    <div className="navbar">
        <span className="logo">Lama Chat</span>
        <div className="user">
              <img src={currentUser.photoURL} alt=""/>
            <span>{currentUser.displayName}</span>
        </div>
    </div>
  )
}

export default Navbar