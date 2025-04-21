// src/hooks/useAuth.ts
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "@/store/store";
import { logout } from "@/store/features/auth/auth.slice";

export const useAuth = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
  };

  return {
    auth,
    user: auth.currentUser,
    token: auth.accessToken,
    isLoggedIn: !!auth.accessToken,
    handleLogout,
  };
};
