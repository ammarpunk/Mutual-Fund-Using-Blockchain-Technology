export const getUserInfo = () => {
  const Cookie = require("js-cookie");
  const userInfo = Cookie.get("investor") ? JSON.parse(Cookie.get("investor")) : null;

  return userInfo;
};

export const logout = () => {
    const Cookie = require("js-cookie");
    Cookie.remove("investor")
}