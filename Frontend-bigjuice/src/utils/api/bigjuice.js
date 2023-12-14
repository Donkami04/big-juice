import axios from "axios";

const ENVIRONMENT = import.meta.env.VITE_ENVIRONMENT;
let envi;

if (ENVIRONMENT === "local") {
  envi = "localhost";
} else if (ENVIRONMENT === "development") {
  envi = "";
} else if (ENVIRONMENT === "production") {
  envi = "";
}

export const BASE_API_URL = `http://${envi}:3000/api/bigjuice`;

export const getProducts = async () => {
  return axios
    .get(`${BASE_API_URL}/products`)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(`Error desde la API - PRODUCTS: ${error}`);
    });
};