import React from "react";
import Visualizer from "./SortingComponents/Visualizer";

function Sorting() {
    return (
        <div className="sorting">
            <div className="sorting--container">
                <div className="sorting--description">

                </div>
                <div className="sorting--box">
                    <div className="sorting--form">
                        
                    </div>
                    <Visualizer/>
                </div>
            </div>
        </div>
    );
}

export default Sorting;