import Cookie from "js-cookie";

export const RemoveCookie = (cookiename) => {
  return Cookie.remove(cookiename);
};
