import axios from "axios";

//ACTION TYPES
const SET_CART = "SET_CART";
const ADD_ITEM = "ADD_ITEM";
const CREATE_CART = "CREATE_CART";
const CHECKOUT = "CHECKOUT";

//ACTION CREATORS
export const _setCart = (cart) => {
  return {
    type: "SET_CART",
    cart,
  };
};
export const _addItem = (item) => {
  return {
    type: "ADD_ITEM",
    item,
  };
};
export const _createCart = (cart) => {
  return {
    type: "CREATE_CART",
    cart,
  };
};
export const _checkout = (cart) => {
  return {
    type: "CHECKOUT",
    cart,
  };
};

//THUNKS
//get all items in current cart
export const fetchCart = (id) => {
  return async (dispatch) => {
    try {

      const { data } = await axios.get(`/api/cart/${id}`, {
        headers: {"authorization": window.localStorage.getItem('token')}
      }
      );
      dispatch(_setCart(data[0]));
    } catch (error) {
      //stuff happens
    }
  };
};

//create new cart if one does not exist
export const createCart = (id, product) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/cart/${id}/create`, product);
      dispatch(_createCart(response.data));
    } catch (error) {
      //stuff happens
    }
  };
};

//add product to cart
export const addItem = (id, orderDetails) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(`/api/cart/${id}`, orderDetails);
      dispatch(_addItem(response.data));
    } catch (error) {
      //stuff happens
    }
  };
};

//checkout cart
export const checkout = (id) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`api/cart/${id}/checkout`);
      dispatch(_checkout(response.data));
    } catch (error) {
      //stuff happens
    }
  };
};

//REDUCER
//Initial State
const initialState = [];

//Reducer
export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case CREATE_CART:
      return action.cart;
    case ADD_ITEM:
      return { ...state, orderDetails: [...state.orderDetails, action.item] };
    default:
      return state;
  }
}
