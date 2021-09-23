import Axios from "axios";

const SET_PRODUCTS = "SET_PRODUCTS";

export const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const fetchProducts = () => {
  return async (dispatch) => {
    const { data } = await Axios.get("api/products");
    const products = setProducts(data);
    dispatch(products);
  };
};

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return actions.products;
    default:
      return state;
  }
}
