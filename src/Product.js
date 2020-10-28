import React from 'react'
import "./Product.css"
import { useStateValue } from './StateProvider'

function Product({ id, title, price, rating, image }) {
  const [state, dispatch] = useStateValue();
  const addToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      item: {
        id: id, title: title, price: price, rating: rating, image: image
      }
    });
  }

  //Alternative is to CREATE, FILL, AND MAP an array in one line ---> Array(int).fill().map((_,i)=>(JSX HERE))
  //let ratingStars = []
  // for(let i = 1; i <= rating; i++){
  //   ratingStars.push(<span className="star" role="img">&#11088;</span>)
  // }

  return (
    <div className="product">
      <div className="product-info">
        <p>{title}</p>
        <p className="product-price">
          <small>$</small><strong>{price}</strong>
        </p>
        <div className="product-rating">
          {Array(rating).fill().map((_, i) =>
            (<span className="star" role="img">&#11088;</span>))
          }
        </div>
      </div>
      <img className="product-image" src={image} alt="product" />
      <button className="add-to-cart" onClick={addToCart}>Add to Cart</button>
    </div>
  )
}

export default Product