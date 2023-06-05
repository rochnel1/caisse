import axios from "axios";
import { setURL } from "./Variables";

export const BASE_URL = setURL("");

export const api = (endpoint) => {
  let url = setURL(endpoint + "/");
  let separator = "/";
  return {
    fetch: () => axios.get(url),
    fetchById: (id) => axios.get(url + id),
    fetchByIds: (id1, id2, id3) =>
      axios.get(url + id1 + separator + id2 + separator + id3),
    post: (data) => axios.post(url, data),
    put: (id, data) => axios.put(url + id, data),
    delete: (id) => axios.delete(url + id),
  };
};
