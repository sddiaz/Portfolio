import React, { useEffect, useState } from "react";

function Visualizer() {
    const [arr, setArr] = useState([]);

    // Reset Array on Mount
    useEffect(() => {
        resetArray(100); 
    }, []);
    function resetArray(size) {
        // Default size of 100.
        let arraySize = size ? size : 100;
        const arr = [];
        for (let i = 0; i < 100; i++) {
            arr.push(randFromInterval(5, 1000));
        };
        setArr(arr);
    };

    function randFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    return ( <></>
        // <div className="visualizer--container">
        //     {arr.map((value, index) => (
        //         <div className="visualizer--bar" key={index}>
        //             {value}
        //         </div>
        //     ))}
        // </div>
    );
};

export default Visualizer;