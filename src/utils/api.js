import axios from "axios";
import { setURL } from "./Variables";

export const BASE_URL = setURL("");

export const api = (endpoint) => {
  let url = setURL(endpoint + "/");
  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    post: (data) => axios.post(url, data),
    put: (id, data) => axios.put(url + id, data),
    delete: (id) => axios.delete(url + id),
  };
};
