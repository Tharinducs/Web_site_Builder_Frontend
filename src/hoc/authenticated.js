export const authenticated = () => {
  let token = localStorage.getItem("loginToken");
  token = JSON.parse(token);
  if (token && token.accesstoken) {
    return true;
  } else {
    return false;
  }
};


