import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function UnauthenticatedGuard({ redirectTo, children }) {
    const authenticated = useSelector((state) => state.auth.authenticated);

    if (authenticated) {
        return <Navigate to={redirectTo} />;
    }
    return children;
}
