import UserModel from "./UserModel";

export default interface AuthContextValue {
  auth: {
    status: string;
    user: UserModel | null;
  };
  isLoading: boolean;
  authAction: any;
  // setAction: any;
}
