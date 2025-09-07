import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Login from "../../pages/Login/Login";

const PrivateRoute = ({ children }) => {
  const { isLoggedIn, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (isLoggedIn) {
    return children;
  }

  return <Login />;
};

export default PrivateRoute;
