import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthed, isAdmin } from "../lib/auth";

export interface AdminRouteProps {
  children: React.ReactNode;
}

export const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const location = useLocation();

  if (!isAuthed()) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!isAdmin()) {
    return (
      <Navigate
        to="/dashboard"
        state={{ errorToast: "Admin access required. Please sign in with administrator credentials." }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default AdminRoute;
