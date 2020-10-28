import React from "react"
import SearchIcon from "@material-ui/icons/Search"
import AttachMoney from "@material-ui/icons/AttachMoney"
import { Link } from "react-router-dom"
import { useStateValue } from "./StateProvider"
import { auth } from "./firebase"
import swal from "sweetalert";
import "./Header.css"

function Header() {
  const [{ cart, user }, dispatch] = useStateValue();
  const signoutFromHeader = () => {
    if (user) { auth.signOut() }
  }

  const searchAlert = () => {
    swal("Proof of Concept", "No search functionality in this verison of the app.", "info")
  }
  return (
    <>
      <div className="header">
        <Link to="/">
          <img className="header-logo" src="./zeus-logo.png" alt="" />
        </Link>
        <div className="header-search" onClick={searchAlert}>
          <input className="search-input" type="text" />
          <SearchIcon className="search-icon" />
        </div>
        <div className="header-nav">
          <Link to="/login">
            <div className="header-option" onClick={signoutFromHeader}>
              <span className="header-text1">{!user || user === 'guest' ? "Hello" : user.email}</span>
              <span className="header-text2">{user && user !== 'guest' ? "Sign Out" : "Sign In"}</span>
            </div>
          </Link>
          <Link to="/store">
            <div className="header-option">
              <span className="header-text1">Zeus</span>
              <span className="header-text2">Shop</span>
            </div>
          </Link>
          <Link to="/orders">
            <div className="header-option">
              <span className="header-text1">Past</span>
              <span className="header-text2">Orders</span>
            </div>
          </Link>
          <Link to="/profile">
            <div className="header-option">
              <span className="header-text1">Your</span>
              <span className="header-text2">Profile</span>
            </div>
          </Link >
          <Link to="/checkout">
            <div className="header-basket">
              <AttachMoney />
              <span className="header-text2 item-count">{cart.length}</span>
            </div>
          </Link>
        </div>

      </div>

    </>
  )
}

export default Header
