import axios from "axios";

const API_KEY = "";
const API_SECRET = "";
const BASE_URL = "https://api4.binance.com";

export const BINANCE_API = axios.create({
  baseURL: BASE_URL,

  params: {
    username: API_KEY,
    password: API_SECRET,
  },
});
