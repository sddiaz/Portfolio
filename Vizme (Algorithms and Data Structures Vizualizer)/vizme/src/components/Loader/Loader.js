import React, { useEffect, useState } from "react";
import { ClimbingBoxLoader } from 'react-spinners'

function Loader() {
    const [loading, setLoading] = useState(true);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false); 
        }, 3000);
    }, []);

    useEffect(() => {
        const query = window.matchMedia('(prefers-color-scheme: dark)');
        if (query.matches) {
            setDarkMode(true);
        }
    }, [])

    useEffect(() => {
        // Hide the scrollbar when loading is true
        if (loading) {
            document.body.style.overflow = 'hidden';
            document.body.style.overflowX - 'hidden';
        } else {
            document.body.style.overflow = ''; 
            document.body.style.overflowX - 'hidden';
        }
    }, [loading]);

    return (
        <div className={`loader ${loading ? 'visible' : 'hidden'}`}>
            <ClimbingBoxLoader
                color={darkMode ? "white" : "black"}
                loading={loading}
                size={20}
            />
        </div>
    );
}

export default Loader;
