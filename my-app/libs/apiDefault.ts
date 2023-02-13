import getToken from "./getToken";

const defaultOptions = {
  headers: {
    Authentication: `Bearer ${getToken}`,
    "Content-Type": "application/json",
  },
};

export default defaultOptions;
