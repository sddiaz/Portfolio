import React, { useState, useEffect } from "react";
import { Box, Button, Slider, Tab } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { getMergeSortAnimations } from "./Algorithms/SortingAlgorithms";

function Sorting() {    

    //#region Variables
    const [sorting, setSorting] = useState(false);
    const [arr, setArr] = useState([]);
    const [arrSize, setArrSize] = useState(10);
    const [width, setWidth] = useState(0);
    const [speed, setSpeed] = useState(100);
    const [resetKey, setResetKey] = useState(0.0);
    const [sliderPosition, setSliderPosition] = useState(10);
    // const [sortValue, setSortValue] = useState(1);
    const theme = useTheme();
    // Reset array after Slider Changes
    const changeKey = () => {
        setResetKey((prevKey) => prevKey + .1);
    }

    let buttonStyle = {
      color: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#fff' : '#000',
      background: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#000' : '#fff',
      '&:hover': {
        background: window.matchMedia('(prefers-color-scheme: dark)').matches ? '#333' : '#ccc',
      },
    };

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

    function handleTabChange(event, newValue) {
      setSortValue(newValue);
    }

    // function bubbleSort(arr) {
    //     const animations = getBubbleSortAnimations(arr);
    //     handleAnimations(animations);
    // }

    // function selectionSort(arr) {
    //   const animations = getSelectionSortAnimations(arr);
    //   handleAnimations(animations);
    // }
    
    // function insertionSort(arr) {
    //   const animations = getInsertionSortAnimations(arr);
    //   handleAnimations(animations);
    // }

    // function quickSort(arr) {
    //   const animations = getQuickSortAnimations(arr);
    //   handleAnimations(animations);
    // }

    function mergeSort(arr) {
      let animations = getMergeSortAnimations(arr);
      let animationTime = speed * animations.length;
      handleAnimations(animations);
      setTimeout(() => {
            setSorting(false);
        }, animationTime);
    }

    // function heapSort(arr) {
    //   const animations = getHeapSortAnimations(arr);
    //   handleAnimations(animations);
    // }

    // function timSort(arr) {
    //   const animations = getTimSortAnimations(arr);
    //   handleAnimations(animations);
    // }
    // Function to change our bars based on the animations provided. 
    function handleAnimations(animations) {
      setSorting(true);
      for (let i = 0; i < animations.length; i++) {
        const arrayBars = document.getElementsByClassName('visualizer--bar');
        const isColorChange = i % 3 !== 2;
        if (isColorChange) {
          const [barOneIdx, barTwoIdx] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = i % 3 == 0 ? window.matchMedia('(prefers-color-scheme: dark)').matches ? '#000' : '#fff' : "#800020";
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
                            <Button disabled={sorting}
                                    sx={buttonStyle} 
                                    className="form--generateBtn" 
                                    variant="contained" 
                                    onClick={changeKey}>New Array</Button>
                            <Slider 
                            disabled={sorting}
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
                            <Button 
                            disabled={sorting}
                            sx={buttonStyle} 
                            className="form--generateBtn" 
                            variant="contained" 
                            onClick={() => mergeSort(arr)}>Sort</Button>
                        </div>
                        <div className="form--info">
                          {/* <Box sx={{ width: '100%', typography: 'body1' }}>
                            <TabContext value={value}>
                              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <TabList onChange={handleChange} aria-label="lab API tabs example">
                                  <Tab label="Item One" value="1" />
                                  <Tab label="Item Two" value="2" />
                                  <Tab label="Item Three" value="3" />
                                </TabList>
                              </Box>
                              <TabPanel value="1">Item One</TabPanel>
                              <TabPanel value="2">Item Two</TabPanel>
                              <TabPanel value="3">Item Three</TabPanel>
                            </TabContext>
                          </Box> */}
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