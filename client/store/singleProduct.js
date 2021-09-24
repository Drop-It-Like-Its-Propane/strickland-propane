//Single Product Reducer

import axios from "axios";

//ACTION TYPES
const SET_PRODUCT = "SET_PRODUCT";

//ACTION CREATORS
export const setProduct = (product) => {
  return {
    type: "SET_PRODUCT",
    product
  };
};

//THUNK
//retrieve single item from database using id
export const fetchProduct = (id, history) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      dispatch(setProduct(response.data));
    } catch (error) {
      //this may need to be changed
      history.push("/404");
    }
  };
};

//REDUCER
//Initial State
const initialState = {};

//Reducer
export default function productReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCT:
      //add product to state
      return action.product;
    default:
      return state;
  }
}
