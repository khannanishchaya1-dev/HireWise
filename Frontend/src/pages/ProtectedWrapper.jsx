import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#001E2B] text-white">
        Loading...
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}