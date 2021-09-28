import axios from "axios";

//ACTION TYPES
const SET_CART = "SET_CART";
const ADD_ITEM = "ADD_ITEM";
const CREATE_CART = "CREATE_CART";
const CHECKOUT = "CHECKOUT";
const DELETE_ITEM = "DELETE_ITEM";

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

export const _deleteItem = (cart) => {
  return {
    type: DELETE_ITEM,
    cart,
  };
};

//THUNKS
//get all items in current cart
export const fetchCart = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/cart/${id}`, {
        headers: { authorization: window.localStorage.getItem("token") },
      });
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
      const response = await axios.post(`/api/cart/${id}/create`, product, {
        headers: { authorization: window.localStorage.getItem("token") },
      });
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
      const response = await axios.post(`/api/cart/${id}`, orderDetails, {
        headers: { authorization: window.localStorage.getItem("token") },
      });
      dispatch(_addItem(response.data));
    } catch (error) {
      //stuff happens
    }
  };
};

//checkout cart
export const checkout = (id, history) => {
  return async (dispatch) => {
    try {
      const response = await axios.put(`/api/cart/${id}/checkout`, null, {
        headers: { authorization: window.localStorage.getItem("token") },
      });
      dispatch(_checkout(response.data));
      history.push(`/checkout/confirmation`);
    } catch (error) {
      //stuff happens
    }
  };
};

//delete Item
export const deleteItem = (id) => {
  return async (dispatch) => {
    try {
      console.log("delete thunk id", id);
      const { data } = await axios.delete(`api/cart/${id}`, {
        headers: { authorization: window.localStorage.getItem("token") },
      });
      dispatch(_deleteItem(data));
    } catch (error) {
      //stuff}
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
      return {
        ...action.cart.newOrder,
        orderDetails: [action.cart.newOrderDetails],
      };
    case ADD_ITEM:
      return { ...state, orderDetails: [...state.orderDetails, action.item] };
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.item.id);
    case EDIT_CART:
      return {
        ...state,
        orderDetails: state.orderDetails.map((item) =>
          item.id === action.cart.id ? action.cart : item
        ),
      };
    case CHECKOUT:
      return action.cart;
    default:
      return state;
  }
}
