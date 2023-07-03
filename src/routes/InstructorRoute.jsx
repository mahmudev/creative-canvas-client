import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useInstructor from "../hooks/useInstructor";
import Loader from "../componets/Loader.jsx/Loader";

const InstructorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const [isInstructor, isInstructorLoading] = useInstructor();
  const location = useLocation();

  if (loading || isInstructorLoading) {
    return <Loader></Loader>;
  }

  if (user && isInstructor) {
    return children;
  }
  return <Navigate to="/404" state={{ from: location }} replace></Navigate>;
};

export default InstructorRoute;
