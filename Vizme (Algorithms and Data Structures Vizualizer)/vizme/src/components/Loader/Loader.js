import React from "react";
import { ClimbingBoxLoader } from 'react-spinners'
import './Loader.css';

function Loader() {
    return (
        <div className="loader">
            <ClimbingBoxLoader
            size={20}
            color="white" />
        </div>
    );
}

export default Loader;