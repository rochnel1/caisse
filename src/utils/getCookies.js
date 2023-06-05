import Cookie from "js-cookie";

export const GetCookie = (cookiename) => {
  return Cookie.get(cookiename);
};
