import { Navigate } from "react-router-dom";

const AuthRoute = ({ authToken, requirePermissions, children }) => {
  if (!authToken) {
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }

  // if (Date.now() > decoded["exp"] * 1000) {
  //     localStorage.clear();
  //     return <Navigate to="/login" replace />;
  // }

  // if (requirePermissions) {
  //     for(const permission of requirePermissions) {
  //         if (decoded["permission_codes"].includes(permission)) {
  //             console.log(`Permission Granted: ${permission}`)
  //             return children;
  //         }
  //     }
  //     console.warn(`Permission Denied.`)
  //     return <Navigate to="/permission-denied" replace />;
  // }
  return children;
};
export default AuthRoute;
