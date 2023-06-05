import Cookie from "js-cookie";

export const SetCookie = (cookiename, caisseData) => {
  Cookie.set(cookiename, caisseData, {
    expires: 2,
    secure: true,
    sameSite: "strict",
    path: "/",
  });
};
