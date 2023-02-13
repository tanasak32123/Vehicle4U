import getToken from "./getToken";

const defaultOptions = {
  headers: {
    Authentication: `Bearer ${getToken}`,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
};

export default defaultOptions;
