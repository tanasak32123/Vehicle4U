import UserModel from "./UserModel";

export default interface AuthContextValue {
  user?: UserModel | null;
  isAuthenticate?: boolean;
  loading?: boolean;
  authAction?: Object;
  setAction?: Object;
}
