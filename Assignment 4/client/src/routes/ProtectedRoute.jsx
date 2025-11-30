/**
 * ProtectedRoute component guards nested routes and ensures only authenticated users can access them.
 * 
 * The component reads the current user from the UserContext via useUser(). If no authenticated user
 * is available, it redirects the client to the "/login" route using React Router's Navigate component
 * (with replace to avoid keeping the protected route in history). If a user is present, it renders
 * an Outlet to allow child routes to render.
 * 
 * @component
 * @returns {JSX.Element} Either an Outlet for authenticated users or a Navigate redirect to "/login".
 * 
 * @example
 * // Usage in a React Router v6 setup
 * <Route element={<ProtectedRoute />}>
 *   <Route path="/dashboard" element={<Dashboard />} />
 * </Route>
 */

import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ProtectedRoute = () => {
    const { user } = useUser();

    if (!user) return <Navigate to="/login" replace />;
    
    return <Outlet />;
};

export default ProtectedRoute;