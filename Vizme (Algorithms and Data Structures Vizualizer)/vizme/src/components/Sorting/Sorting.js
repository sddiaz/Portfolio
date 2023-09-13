import React, { useState, useEffect } from "react";
import { Box, Button, Divider, FormControl, InputLabel, MenuItem, OutlinedInput, Select, Slider, Tab, Tabs } from "@mui/material";
import { createTheme, useTheme } from '@mui/material/styles';
import { getBubbleSortAnimations, getMergeSortAnimations, getSelectionSortAnimations } from "./Algorithms/SortingAlgorithms";

import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import SwipeIcon from '@mui/icons-material/Swipe';
import StyleIcon from '@mui/icons-material/Style';
import BoltIcon from '@mui/icons-material/Bolt';
import MergeIcon from '@mui/icons-material/Merge';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';

function Sorting() {    

    //#region Variables

    const [sorting, setSorting] = useState(false);
    const [arr, setArr] = useState([]);
    const [arrSize, setArrSize] = useState(10);
    const [width, setWidth] = useState(0);
    const [speed, setSpeed] = useState(100);
    const [resetKey, setResetKey] = useState(0.0);
    const [sliderPosition, setSliderPosition] = useState(10);
    const [tabValue, setTabValue] = useState(1);
    const [mediaDark, setMediaDark] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches);
    const [tabOrientation, setTabOrientation] = useState('horizontal');
    const [estimatedRuntime, setEstimatedRuntime] = useState(null);
    const theme = useTheme();
    // Reset array after Slider Changes
    const changeKey = () => {
        setResetKey((prevKey) => prevKey + .1);
    }
    let dividerStyle = {
      background: (window.matchMedia('(prefers-color-scheme: dark)').matches) ? '#fff' : 'rgba(0,0,0,0.87)',
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
    }, [resetKey]);

    useEffect(() => {
      setArrSize(sliderPosition);
    }, [sliderPosition]);

    useEffect(() => {
      // Do this to order our function calls
      // In accordance with the current state
      // ... otherwise errors will ensue.
        if (sorting) {
          chooseSort();
        }
    }, [sorting]);

    function resetArray() {
      let arrayBars = document.getElementsByClassName('')
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
        if (window.innerWidth < 1024) {
          setTabOrientation("horizontal");
        }
        else {
          setTabOrientation("vertical");
        }
        setWidth(newWidth);
    }

    function handleTabChange(event) {
      setTabValue(event.target.value);
    }

    function handleSort() {
        setSorting(true);
    }

    function chooseSort() {
      let animations;
      switch (tabValue) {
        case 1:
            animations = getBubbleSortAnimations(arr);
            handleAnimations(animations);
          break;
      
        case 2:
            animations = getSelectionSortAnimations(arr);
            handleAnimations(animations);
          break;
        
        case 3:
            animations = getInsertionSortAnimations(arr);
            handleAnimations(animations);
          break;

        case 4:
            animations = getQuickSortAnimations(arr);
            handleAnimations(animations);
          break;
          
        case 5:
            animations = getMergeSortAnimations(arr);
            handleAnimations(animations);
          break;

        case 6:
            animations = getHeapSortAnimations(arr);
            handleAnimations(animations); 
          break;

        case 7:
            animations = getTimSortAnimations(arr);
            handleAnimations(animations);
          break;
      }
    }

    // Function to change our bars based on the animations provided. 
    function handleAnimations(animations) {
      // Obtain Total Animation Time + DOM elements. 
      let animationTime = speed * animations.length;
      let arrayBars = document.getElementsByClassName('visualizer--bar');
      let barValues = document.getElementsByClassName('visualizer--barValues');

      // Run Animations (Either Height Change / Color Change)
      for (let i = 0; i < animations.length; i++) {
        const animationObject = animations[i];
        const animationType = Object.keys(animationObject)[0]; // Obtain the type of the current animation.
        const animationValues = animationObject[animationType]; // Grabs the indices of the current animation. 
        // Color Change
        if (animationType == "Color Change" || animationType == "Color Revert") {
          const [barOneIdx, barTwoIdx] = animationValues;
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          const color = animationType == "Color Change" ? window.matchMedia('(prefers-color-scheme: dark)').matches ? '#000' : '#fff' : "#800020";
          // Revert briefly after selecting. 
          setTimeout(() => {
            barOneStyle.backgroundColor = color;
            barTwoStyle.backgroundColor = color;
          }, i * speed);
        }
        else if (animationType == "Final Position") {
          const barStyle = arrayBars[animationValues].style;
          const color = 'green';
          // Revert briefly after selecting. 
          setTimeout(() => {
            barStyle.backgroundColor = color;
          }, i * speed);
        }
        // The Swap animation is used for bubble sort, selection sort, insertion sort. 
        else if (animationType == "Swap") {
            setTimeout(() => {
              const [barOneIndex, barTwoIndex] = animationValues;
              // Swap!
              const barOneStyle = arrayBars[barOneIndex].style;
              const barTwoStyle = arrayBars[barTwoIndex].style;
              let tempHeight = barValues[barOneIndex].innerHTML;
              barOneStyle.height = `${barValues[barTwoIndex].innerHTML}px`;
              barTwoStyle.height = `${tempHeight}px`;
              
              // Swap the values (text) too!
              if (arrSize < 35) {
                barValues[barOneIndex].innerHTML = barValues[barTwoIndex].innerHTML.toString();
                barValues[barTwoIndex].innerHTML = tempHeight.toString();
              }
          }, i * speed);
        }
        // The Overwrite animation is used for merge sort, 
        else if (animationType == "Overwrite") {
          setTimeout(() => {
                const [barOneIndex, newHeight] = animationValues;
                const barOneStyle = arrayBars[barOneIndex].style;
                barOneStyle.height = `${newHeight}px`;
                if (arrSize < 35) {
                  barValues[barOneIndex].innerHTML = newHeight.toString();
                }
          }, i * speed);
        }
      }
      // Set all colors to green when done. 
      setTimeout(() => {
        for (let i = 0; i < arrayBars.length; i++) {
            arrayBars[i].style.backgroundColor = 'green';
        }

        setSorting(false);
    }, animationTime);
    }
    // Get random number given interval
    function randFromInterval(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    } 
    // Revert to default bar styling.
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
                        <div>

                          <div className="form--controlsTitle">Controls <SettingsIcon fontSize="large" /></div>
                          <Divider className="darkMode" />
                          {/* Select + Slider */}
                          <div className="form--controls">
                            <FormControl style={{width: '40%'}}>
                              <InputLabel color="secondary" className="form--inputLabel">Algorithms</InputLabel>
                              <Select
                                className="form--select"
                                variant="filled"
                                value={tabValue}
                                label="Algorithm"
                                onChange={handleTabChange}
                                color="secondary"
                              >
                                <MenuItem value={1} >
                                  <div className="form--menuItem"> 
                                    <div>
                                      Bubble Sort
                                    </div>
                                    <BubbleChartIcon />
                                  </div>
                                </MenuItem>
                                <MenuItem value={2} >
                                  <div className="form--menuItem"> 
                                    <div>
                                      Selection Sort
                                    </div>
                                    <SwipeIcon />
                                  </div>
                                </MenuItem>
                                <MenuItem value={3} >
                                  <div className="form--menuItem"> 
                                    <div>
                                      Insertion Sort
                                    </div>
                                    <StyleIcon />
                                  </div>
                                </MenuItem>
                                <MenuItem value={4} >
                                  <div className="form--menuItem"> 
                                    <div>
                                      Quick Sort
                                    </div>
                                    <BoltIcon />
                                  </div>
                                </MenuItem>
                                <MenuItem value={5} >
                                  <div className="form--menuItem"> 
                                    <div>
                                      Merge Sort
                                    </div>
                                    <MergeIcon />
                                  </div>
                                </MenuItem>
                                <MenuItem value={6} >
                                  <div className="form--menuItem"> 
                                    <div>
                                      Heap Sort
                                    </div>
                                    <HorizontalSplitIcon />
                                  </div>
                                </MenuItem>
                                <MenuItem value={7} >
                                  <div className="form--menuItem"> 
                                    <div>
                                      Tim Sort
                                    </div>
                                    <MoreTimeIcon />
                                  </div>
                                </MenuItem>

                              </Select>
                            </FormControl>
                            <div style={{width: '40%'}} className="form--slider">
                              Elements: {sliderPosition}
                              <Slider 
                              className="form--slider"
                              style={{width: '100%'}}
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
                            </div>
                          </div>
                          {/* Buttons */}
                          <div className="form--controls">
                            <Button 
                              className="form--buttons"
                              disabled={sorting}
                              variant="contained" 
                              onClick={changeKey}>
                              New Array ↻</Button>
                            <Button  style={{width: '40%'}}
                              disabled={sorting}
                              className="form--generateBtn" 
                              variant="contained" 
                              onClick={() => {
                                handleSort();
                              }}>
                              Sort</Button>
                          </div>

                        </div>

                          <Divider className="darkMode" />
                          <div className="form--controlsTitle">Learn <InfoIcon fontSize="large" /></div>
                          <Divider className="darkMode" />
                          <div className="form--info">
                            Description, 
                            Pseudocode
                            Time/Space Complexity
                            Implementations
                            {estimatedRuntime && 
                            <div>
                              Estimated Animation Time: {estimatedRuntime}s
                              </div>}
                          </div>

                </div>
                <Divider className="darkMode" />
                <div className="sorting--box">
                     <div className="visualizer--container">
                      <div className="visualizer--bars">
                        {arr.map((value, index) => (
                          <div className="bar--stack transition">
                            <div className="visualizer--barValues transition">
                            {arrSize < 35 && value}
                            </div>
                            <div
                              className="visualizer--bar transition"
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