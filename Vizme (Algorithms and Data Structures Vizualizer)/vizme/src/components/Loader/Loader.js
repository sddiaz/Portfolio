import React, { useEffect, useState } from "react";
import { ClimbingBoxLoader } from 'react-spinners'
import './Loader.css';

function Loader() {
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        setTimeout(() => {
            setLoading(false); 
        }, 3000);
    }, []);

    return (
        <div className={`loader ${loading ? 'visible' : 'hidden'}`}>
            <ClimbingBoxLoader
                color="white"
                loading={loading}
                size={20}
            />
        </div>
    );
}

export default Loader;
