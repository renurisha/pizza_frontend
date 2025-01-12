import { Navigate } from 'react-router-dom';

const UnAuthenticatedRoute = ({ isAuthenticated, children }) => {
    if (isAuthenticated) {
      return <Navigate to="/" replace />;
    }
  
    return children;
};
export default UnAuthenticatedRoute