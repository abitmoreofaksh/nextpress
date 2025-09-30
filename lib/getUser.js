import { jwtDecode } from "jwt-decode";

function getToken(cookieStore, tokenName = "token") {
  const cookies = cookieStore.split(";");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=").map((c) => c.trim());
    if (key === tokenName) return value;
  }
  return null;
}

export const getUser = (cookieStore, tokenName) => {
  const token = getToken(cookieStore);
  const decoded = jwtDecode(token);
  return decoded;
};
