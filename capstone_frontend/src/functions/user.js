import axios from "axios";

export const userCart = async (cart, authtoken) =>
  await axios.post(
    `http://localhost:8000/api/user/cart`,
    { cart },
    {
      headers: {
        authtoken,
      },
    }
  );

export const getUserCart = async (authtoken) =>
  await axios.get(`http://localhost:8000/api/user/cart`, {
    headers: {
      authtoken,
    },
  });

export const emptyUserCart = async (authtoken) =>
  await axios.delete(`http://localhost:8000/api/user/cart`, {
    headers: {
      authtoken,
    },
  });
export const saveUserAddress = async (authtoken, address) =>
  await axios.post(
    `http://localhost:8000/api/user/address`,
    { address },
    {
      headers: {
        authtoken,
      },
    }
  );
