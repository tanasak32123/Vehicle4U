import UserModel from "./UserModel";

export default interface AuthContextValue {
  auth: {
    status: string;
    user: UserModel | null;
    role: string | null;
  };
  isLogout: boolean;
  isLoading: boolean;
  authAction: any;
}
