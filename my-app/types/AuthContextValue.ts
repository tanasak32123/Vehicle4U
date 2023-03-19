import UserModel from "./UserModel";

export default interface AuthContextValue {
  auth: {
    status: string;
    user: UserModel | null;
    role: string | null;
  };
  isLoading: boolean;
  authAction: any;
}
