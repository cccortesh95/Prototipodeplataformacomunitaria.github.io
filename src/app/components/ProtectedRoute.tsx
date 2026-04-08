import { Navigate } from "react-router";
import { useAuth, Role } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
  allowedRoles: Role[];
}

export default function ProtectedRoute({ children, allowedRoles }: Props) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" replace />;
  return <>{children}</>;
}
