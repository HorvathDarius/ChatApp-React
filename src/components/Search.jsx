import React from 'react'

const Search = () => {
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text" placeholder="Find a user"/>
      </div>
      <div className="userChat">
        <img src="https://scontent.fbts10-1.fna.fbcdn.net/v/t1.6435-9/152519979_1783406675159944_1444367677009589019_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=bJBFQbTf4WwAX_AC31T&_nc_ht=scontent.fbts10-1.fna&oh=00_AT-MONxcPK6icC_cR715wUg630_33948iw2WDbORTX9myg&oe=636668C5" alt=""/>
        <div className="userChatInfo">
          <span>Jane</span>
        </div>
      </div>
    </div>
  )
}

export default Search