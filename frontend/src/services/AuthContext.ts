import React from "react";
import { UserLoginDetails } from "../types/User";

interface AuthContextType {
    user: string;
    login: (user: UserLoginDetails, callback: VoidFunction) => void;
    logout: (callback: VoidFunction) => void;
  }
  
export const AuthContext = React.createContext<AuthContextType>(null!);

export const useAuth = () => {
    return React.useContext(AuthContext);
}