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
    fetchBy2Ids: (id1, id2) => axios.get(url + id1 + separator + id2),
    fetchBy2IdsPut: (id1, id2) => axios.put(url + id1 + separator + id2),
    fetchByIdsOp: (id1, id2, id3, id4) =>
      axios.get(
        url + id1 + separator + id2 + separator + id3 + separator + id4
      ),
    post: (data) => axios.post(url, data),
    postOps: (param1, param2, param3) =>
      axios.post(url + param1 + separator + param2 + separator + param3),
    postOpsClo: (param1, param2) =>
      axios.post(url + param1 + separator + param2),
    put: (id, data) => axios.put(url + id, data),
    delete: (id) => axios.delete(url + id),
  };
};
