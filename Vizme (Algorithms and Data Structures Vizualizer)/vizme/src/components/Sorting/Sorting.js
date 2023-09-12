import React, { useState, useEffect } from "react";
import { Button, Slider } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';
import SortingAlgorithms, { getMergeSortAnimations } from "./Algorithms/SortingAlgorithms";

function Sorting() {    

    //#region Variables

    const [arr, setArr] = useState([]);
    const [arrSize, setArrSize] = useState(10);
    const [width, setWidth] = useState(0);
    const [speed, setSpeed] = useState(100);
    const [resetKey, setResetKey] = useState(0.0);
    const [sliderPosition, setSliderPosition] = useState(10);
    const theme = useTheme();
    // Reset array after Slider Changes
    const changeKey = () => {
        setResetKey((prevKey) => prevKey + .1);
    }

    //#endregion

    //#region Methods

    window.addEventListener("resize", handleResize);
    // Reset Array on Component Mount
    useEffect(() => {
      resetArray();
    }, []);
    // Handle State Changes on Slider Change
    useEffect(() => {
        handleResize(); // Update width when arrSize changes
        setSpeed(1000/arrSize);
        resetArray();
    }, [arrSize]);
    useEffect(() => {
        resetArray();
    }, [resetKey])
    useEffect(() => {
      setArrSize(sliderPosition);
    }, [sliderPosition])

    function resetArray() {
        const newArr = [];
        for (let i = 0; i < arrSize; i++) {
            // We use window.innerHeight/2 as the maximum height to keep bars from overflowing into our UI.
            newArr.push(randFromInterval(5, window.innerHeight / 2));
        }
        setArr(newArr);
        resetStyling();
    }

    function handleResize() {
        const newWidth = window.innerWidth < 1024 ? 
            (window.innerWidth * 0.85) / arrSize :
            (window.innerWidth * 0.9 * 0.75) / arrSize;
        setWidth(newWidth);
    }

    function mergeSort(arr) {
        const animations = getMergeSortAnimations(arr);
        handleAnimations(animations);
    }
    // Function to change our bars based on the animations provided. 
    function handleAnimations(animations) {
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('visualizer--bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 == 0 ? window.matchMedia('(prefers-color-scheme: dark)').matches ? '#800020' : '#000' : "rgba(0, 0, 0, 1)";
          // Finished Elements.
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * speed);
        } else {
          setTimeout(() => {
            const [barOneIndex, newHeight] = animations[i];
            const barOneStyle = arrayBars[barOneIndex].style;
            barOneStyle.height = `${newHeight}px`;
          }, i * speed);
        }
      }
      // Reset Styling 
      resetStyling(); 
    }

    function randFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    } 

    function resetStyling() {
      const arrayBars = document.getElementsByClassName('visualizer--bar');
      const defaultStyling = window.matchMedia('(prefers-color-scheme: dark)').matches ? '#fff' : '#000';
      for (let i = 0; i < arrayBars.length; i++) {
          arrayBars[i].style.backgroundColor = defaultStyling; // Set to default color
      }
    }


    //#endregion

    //#region Component

    return (
        <div className="sorting">
            <div className="sorting--container">
                <div className="sorting--description">
                        <div className="form--controls">
                            <Button className="form--generateBtn" variant="contained" onClick={changeKey}>New Array</Button>
                            <Slider 
                                defaultValue={10}
                                aria-label="time-indicator"
                                size="small"
                                value={sliderPosition}
                                min={10}
                                step={1}
                                max={100}
                                onChange={(_, value) => setSliderPosition(value)}
                                sx={{
                                    color: (window.matchMedia('(prefers-color-scheme: dark)').matches) ? '#fff' : 'rgba(0,0,0,0.87)',
                                    height: 4,
                                    width: 100,
                                    '& .MuiSlider-thumb': {
                                      width: 8,
                                      height: 8,
                                      transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                                      '&:before': {
                                        boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                                      },
                                      '&:hover, &.Mui-focusVisible': {
                                        boxShadow: `0px 0px 0px 8px ${
                                          theme.palette.mode === 'dark'
                                            ? 'rgb(255 255 255 / 16%)'
                                            : 'rgb(0 0 0 / 16%)'
                                        }`,
                                      },
                                      '&.Mui-active': {
                                        width: 20,
                                        height: 20,
                                      },
                                    },
                                    '& .MuiSlider-rail': {
                                      opacity: 0.28,
                                    },
                                }}
                            />
                            <Button className="form--generateBtn" variant="contained" onClick={() => mergeSort(arr)}>Merge</Button>
                        </div>
                        <div className="form--info">

                        </div>
                    </div>
                <div className="sorting--box">
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
                </div>
            </div>
        </div>
    );

    //#endregion
}

export default Sorting;