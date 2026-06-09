import { Navigate } from "react-router";

interface NavigateProps {
    to: string;
}

function CustomNavigate({to}: NavigateProps) {
    return <Navigate to={to} />;
}

export default CustomNavigate;