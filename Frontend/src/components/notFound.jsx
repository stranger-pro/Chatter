import { Navigate } from "react-router-dom";
import { useApp } from '../context/AppContext'

const NotFound = () => {
    const { isAuth } = useApp();

    if (isAuth) {
        return <Navigate  to={"/chat"} replace/>;
    } else {
        return <Navigate  to={"/signin"} replace />;
    }
}

export default NotFound
