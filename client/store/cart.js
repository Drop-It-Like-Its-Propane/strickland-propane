import axios from "axios";

//ACTION TYPES
const SET_CART = "SET_CART"
const ADD_ITEM = "ADD_ITEM"

//ACTION CREATORS
export const _setCart = (cart) => {
  return {
    type: 'SET_CART',
    cart
  }
}
export const _addItem = (item) => {
  return {
    type: 'ADD_ITEM',
    item
  }
}

//THUNKS
//get all items in current cart
export const fetchCart = (id) => {
  return async(dispatch)=> {
    try {
      const response = await axios.get(`/api/cart/${id}`);
      dispatch(_setCart(response.data))
    } catch(error) {
      //stuff happens
    }
  }
}

//add product to cart
export const addItem = (id, product) => {
  return async(dispatch)=> {
    try {
      const response = await axios.post(`/api/cart/${id}`, product);
      dispatch(_addItem(response.data))
    } catch(error) {
      //stuff happens
    }
  }
}

//REDUCER
//Initial State
const initialState = {};

//Reducer
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      //add cart to state
      return [...action.cart];
    case ADD_ITEM:
      return [...state, action.item]
    default:
      return state;
  }
}
