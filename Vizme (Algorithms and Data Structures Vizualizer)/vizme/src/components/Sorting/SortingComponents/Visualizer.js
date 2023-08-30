import React, { useEffect, useState } from "react";

function Visualizer() {

    //#region Variables

    const [arr, setArr] = useState([]);
    const [arrSize, setArrSize] = useState(100);
    const [width, setWidth] = useState(0);
    
    //#endregion

    //#region Methods

    useEffect(() => {
        resetArray();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        handleResize(); // Update width when arrSize changes
    }, [arrSize]);

    function resetArray() {
        const newArr = [];
        for (let i = 0; i < arrSize; i++) {
            newArr.push(randFromInterval(5, window.innerHeight / 2));
        }
        setArr(newArr);
    }

    function randFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    function handleResize() {
        const newWidth = window.innerWidth < 1024 ? 
            (window.innerWidth * 0.8) / arrSize :
            (window.innerWidth * 0.9 * 0.75) / arrSize;
        setWidth(newWidth);
    }

    //#endregion

    //#region Component

  return (
    <div className="visualizer--container">
      <div className="visualizer--bars">
        {arr.map((value, index) => (
          <div
            className="visualizer--bar"
            key={index}
            style={{
              height: `${value}px`,
              width: `${width}px`,
            }}
          ></div>
        ))}
      </div>
    </div>
  );

        //#endregion
}

export default Visualizer;
