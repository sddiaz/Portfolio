import { Widgets } from "@mui/icons-material";
import React, { useEffect, useState } from "react";

function Visualizer({ resetKey, length }) {

    //#region Variables

    const [arr, setArr] = useState([]);
    const [arrSize, setArrSize] = useState(length);
    const [width, setWidth] = useState(0);
    window.addEventListener("resize", handleResize);

    //#endregion

    //#region Methods

    useEffect(() => {
        resetArray();
    }, []);

    useEffect(() => {
        handleResize(); // Update width when arrSize changes
        resetArray();
    }, [arrSize]);

    useEffect(() => {
        resetArray();
    }, [resetKey])

    useEffect(() => {
      setArrSize(length);
    }, [length])

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
            (window.innerWidth * 0.85) / arrSize :
            (window.innerWidth * 0.9 * 0.75) / arrSize;
        setWidth(newWidth);
    }

    //#endregion

    //#region Component

  return (
    <div className="visualizer--container">
      <div className="visualizer--bars">
        {arr.map((value, index) => (
          <div className="bar--stack">
            <div
              className="visualizer--bar"
              key={index}
              style={{
                height: `${value}px`,
                width: `${width}px`,
              }}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );

        //#endregion
}

export default Visualizer;
