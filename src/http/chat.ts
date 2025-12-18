import axios from "axios";
import { storage } from "@nucleoidjs/webstorage";

const instance = axios.create({
  headers: {
    common: {
      "Content-Type": "application/json",
    },
    Authorization: `Bearer ${storage.get("link", "accessToken")}`,
  },
});

axios.interceptors.request.use((request) => {
  return request;
});

axios.interceptors.response.use((response) => {
  return response;
});

export default instance;
