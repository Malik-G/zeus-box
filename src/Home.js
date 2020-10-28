import React from "react"
import Product from "./Product"
import { Link } from "react-router-dom"
import "./Home.css"

function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <video className="home-video-banner" loop autoPlay muted>
          <source src="https://firebasestorage.googleapis.com/v0/b/photo-storage-96fec.appspot.com/o/dogs_running.mp4?alt=media&token=e273c738-0ab0-428e-b7bb-2085e2c50a0f"
            className="login-video
          -source"
            type="video/mp4" />
        </video>
      </div>
      
      <h1 className="home-title">Zeus Box</h1>
      <div className="shop-button">
        <Link to="./store">
          <button>Shop</button>
        </Link>
      </div>
    </div>
  )
}

export default Home
