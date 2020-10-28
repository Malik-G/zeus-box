import React, { useEffect } from 'react'
import LoginMessage from './LoginMessage';
import { useStateValue } from './StateProvider'
import swal from "sweetalert";
import "./Profile.css"

function Profile() {
  const [{ user }, dispatch] = useStateValue();

  useEffect(() =>{
    swal("Page Under Construction", "Cool changes to come!", "info")
  }, [])

  return (
    <div className="profile">
      {/* <div className="profile-title"> */}
      <h1 className="profile-title">Profile</h1>
      {/* </div> */}
      {!user ?
        <></>
        :
        user === 'guest' ?
          <div className="message-container">
            <LoginMessage
              messageClass="login-message-dark"
              messageContent={"profile"}
            />
          </div>
          :
          <></>
      }
    </div>
  )
}

export default Profile
