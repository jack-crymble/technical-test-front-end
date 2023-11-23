import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AuthenticatedGuard({ redirectTo, children }) {
    const authenticated = useSelector((state) => state.auth.authenticated);

    if (!authenticated) {
        return <Navigate to={redirectTo} replace />;
    }
    return children;
}
