import React, { useContext, useState } from 'react';
import Cam from "../img/cam.png";
import Add from "../img/add.png";
import More from "../img/more.png"; 
import { ChatContext } from "../context/ChatContext";
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Features = () => {
  const { data } = useContext(ChatContext);
  const [showMenu, setShowMenu] = useState(false)

  const handleSettingsClick = () => {
    if(showMenu === false) setShowMenu(true);
    else setShowMenu(false);
  }

  const handleCameraClick = () => {
    alert("Feature not yet implemented.");
  }

  const handleInviteFriendsClick = () => {
    alert("Can't invite friends yet.");
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
  </div>
  )
}

export default Features