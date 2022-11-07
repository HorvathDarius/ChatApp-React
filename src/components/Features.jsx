import React, { useContext, useEffect, useState } from 'react';
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png"; 
import { ChatContext } from "../context/ChatContext";
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { AuthContext } from '../context/AuthContext';

const Features = () => {
  const { data } = useContext(ChatContext);
  const [showMenu, setShowMenu] = useState(false);
  const [showFriendsMenu, setShowFriendsMenu] = useState(false);
  const [userData, setUserData] = useState({});
  const { currentUser } = useContext(AuthContext);
  let randArray = [];

  const handleSettingsClick = () => {
    if(showMenu === false) setShowMenu(true);
    else setShowMenu(false);
  }

  const handleCameraClick = () => {
    alert("Feature not yet implemented.");
  }

  useEffect(() => {
    const getData = async() => {
      const querySnapshot = await getDocs(collection(db, "users"));
      setUserData(querySnapshot);
    }
    getData();
  }, [showFriendsMenu])

  const handleInviteFriendsClick = async () => {
    if(!showFriendsMenu){
      setShowFriendsMenu(true);
    }else{
      setShowFriendsMenu(false);
    }
  }

  const checkIfSameUser= (doc) =>{
    if(currentUser.uid !== doc.data().uid){
      return true;
    }
  }

  return (
    <div className="chatInfo">
      <span>{data.user?.displayName}</span>
      <div className="chatIcons">
          <img src={Cam} alt="" onClick={handleCameraClick}/>
          <img src={Add} alt="" onClick={handleInviteFriendsClick}/>
          <img src={More} alt="" onClick={handleSettingsClick}/>
          {showMenu && <div className='hiddenMenu'>
            <button onClick={() => { signOut(auth) }}>Logout</button>
          </div>}
      </div>
      {showFriendsMenu && 
      <div className="friendsMenu">
        {userData.forEach(doc => {
          if (checkIfSameUser(doc)){
            randArray.push(doc);
          }
        })}
        {randArray.map(doc =>{
          return(
          <div className="user" key={doc.data().uid}>
            <div className="userInfo">
              <img src={doc.data().photoURL} alt="" />
              <span>{doc.data().displayName}</span>
            </div>
            <button>Add Friend</button>
          </div>
          )
        })}
      </div>}
  </div>
  )
}

export default Features