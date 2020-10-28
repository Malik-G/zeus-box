export const initialState = {
  cart: [],
  total: 0,
  user: null,
  storeLayout: 'product-container-list'
}

//this funtion is being used in Subtotal.js
//ALTERNATIVE is to have `total: state.total += action.item.price` returned in the "ADD_TO_CART" case below
export const getCartTotal = (cart) =>
  cart?.reduce((amount, item) => item.price + amount, 0)

const reducer = (state, action) => {
  console.log(action)
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      }
    case "REMOVE_FROM_CART":
      //findIndex() only targets the first match if there are multiple matches on the condition
      const index = state.cart.findIndex(product => product.id === action.id)
      let newCart = [...state.cart]
      if (index >= 0) {
        newCart.splice(index, 1)
      }
      else {
        console.warn(`Can't remove, product id not found`)
      }
      return {
        ...state,
        cart: newCart,
      }
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      }
    case "EMPTY_CART":
      return {
        ...state,
        cart: []
      }
    case "STORE_LAYOUT":
      return {
        ...state,
        storeLayout: action.layout,
      }
    default:
      return state;
  }
}

export default reducer