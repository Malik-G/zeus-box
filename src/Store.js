import React from 'react'
import Product from "./Product"
import ListIcon from '@material-ui/icons/List';
import AppsIcon from '@material-ui/icons/Apps';
import "./Store.css"
import { useStateValue } from './StateProvider';

function Store() {
  const [{ storeLayout }, dispatch] = useStateValue();
  
  const changeLayout = (classname) => {
    
    dispatch({
      type: "STORE_LAYOUT",
      layout: classname
    });
  }

  return (
    <div className="store">

      <h1 className="store-title">Zeus Shop</h1>
      <div className="style-icons">
        <span title="List View"><ListIcon onClick={ e => changeLayout('product-container-list')} className="list-icon" fontSize="large"/></span>
        <span title="Grid View"><AppsIcon onClick={e => changeLayout('product-container-grid')} className="grid-icon" fontSize="large"/></span>
      </div>
      <div className={storeLayout}>
        <Product
          id="111"
          title="Standard Assorted Box"
          price={29.99}
          rating={5}
          image="https://cdn.shopify.com/s/files/1/0004/1015/7065/products/Puptastic_Party_Time_Dog_Gift_Basket_With_Beer_600x.jpg?v=1571722489"
        />
        <Product
          id="333"
          title="Modern Assorted Box"
          price={39.99}
          rating={4}
          image="https://i.pinimg.com/originals/1d/4b/55/1d4b55c0a26886317d992c6d4c66d9d8.jpg"
        />
        <Product
          id="222"
          title="Cinnamon Box"
          price={29.99}
          rating={3}
          image="https://s.yimg.com/aah/dogbaskets/classy-canine-dog-gift-basket-55.jpg"
        />
        <Product
          id="444"
          title="Starter Chew Set"
          price={24.99}
          rating={4}
          image="https://cdn-ssl.s7.disneystore.com/is/image/DisneyShopping/6105056072955"
        />
        <Product
          id="555"
          title="Fake Food Chew Set"
          price={29.99}
          rating={4}
          image="https://cdn.shopify.com/s/files/1/2998/6740/products/PLAY-American-Classic-Food-Toys_1024x.jpg?v=1561305682"
        />
        <Product
          id="667"
          title="Rope Set"
          price={40.00}
          rating={5}
          image="https://cdn.shopify.com/s/files/1/1091/6174/products/Rope_Toys_01_grande.jpg?v=1512464639"
        />
      </div>

    </div>
  )
}

export default Store
