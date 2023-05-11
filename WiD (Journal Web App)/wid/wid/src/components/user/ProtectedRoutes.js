import { Navigate, Outlet, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react"
import { auth } from "../../firebase"





export default function ProtectedRoutes() {
    const [authUser, setAuthUser] = useState(null);
    const location = useLocation(); 
    // Listen for a new user, if there is one, set authUser to that. 
    useEffect(() => {
        const listen = onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuthUser(user);
        } else {
            setAuthUser(null);
        }
        });
        return () => {
        listen();
        };
    }, []);
    return authUser ? <Outlet /> : <Navigate to="/" replace state={{from: location}}/>;
}