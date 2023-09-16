import React, { useState, useEffect } from "react";
import { Button, Divider, FormControl, InputLabel, Menu, MenuItem, Select, Slider } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import { getBubbleSortAnimations, getHeapSortAnimations, getInsertionSortAnimations, getMergeSortAnimations, getQuickSortAnimations, getRadixSortAnimations, getSelectionSortAnimations, getTimSortAnimations } from "./SortingAlgorithms";

import BubbleChartIcon from '@mui/icons-material/BubbleChart';
import SwipeIcon from '@mui/icons-material/Swipe';
import StyleIcon from '@mui/icons-material/Style';
import BoltIcon from '@mui/icons-material/Bolt';
import MergeIcon from '@mui/icons-material/Merge';
import HorizontalSplitIcon from '@mui/icons-material/HorizontalSplit';
import MoreTimeIcon from '@mui/icons-material/MoreTime';
import SwitchAccessShortcutIcon from '@mui/icons-material/SwitchAccessShortcut';
import SettingsIcon from '@mui/icons-material/Settings';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';
import Description from "./Algorithms/Description";
import * as algorithmData from "./Algorithms/InfoData.json";

function Sorting() {    

    //#region Variables

    const [arr, setArr] = useState([]);
    const [arrSize, setArrSize] = useState(10);
    const [width, setWidth] = useState(0);
    const [sorting, setSorting] = useState(false);
    const [speed, setSpeed] = useState(100);
    const [resetKey, setResetKey] = useState(0.0);
    const [sliderPosition, setSliderPosition] = useState(10);
    const [tabValue, setTabValue] = useState('BubbleSort');
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuValue, setMenuValue] = useState('Description');
    const arrayOfObjects = Object.keys(algorithmData).map(key => ({
      ...algorithmData[key]
    }));
    const open = Boolean(anchorEl);
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
        handleResize(); // Update bar width 
        setSpeed(1000/arrSize); // Update animation speed
        resetArray(); // Generate new array
    }, [arrSize]);
    // The 'resetKey' changes when various events occur in our program
    // this resets our array (on array size change, when we select a new algorithm, etc)
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

    // Generate a new array
    function resetArray() {
      const newArr = [];
      for (let i = 0; i < arrSize; i++) {
          // We use window.innerHeight/2 as the maximum height to keep bars from overflowing into our UI.
          newArr.push(randFromInterval(5, window.innerHeight / 2));
      }
      setArr(newArr);
      resetStyling();
    }
    // Set width of bars according to screen width.
    function handleResize() {
        const newWidth = window.innerWidth < 1024 ? 
            (window.innerWidth * 0.85) / arrSize :
            (window.innerWidth * 0.9 * 0.75) / arrSize;
        setWidth(newWidth);
    }

    function handleTabChange(event) {
      // Reset Menu Value to Default 
      // When new algorithm is selected.
      setMenuValue('Description');
      resetArray();
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
        
        case 8:
            animations = getRadixSortAnimations(arr);
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

      // Run Animations (Either Overwrite / Color Change / Swap)
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
        // Certain algorithms place elements in 
        // the final position each iteration.
        else if (animationType == "Final Position") {
          const barStyle = arrayBars[animationValues].style;
          const color = 'green';
          // Revert briefly after selecting. 
          setTimeout(() => {
            barStyle.backgroundColor = color;
          }, i * speed);
        }
        // The Swap animation is used for bubble sort, selection sort.
        else if (animationType == "Swap") {
            setTimeout(() => {
              const [barOneIndex, barTwoIndex] = animationValues;
              // Swap!
              const barOneStyle = arrayBars[barOneIndex].style;
              const barTwoStyle = arrayBars[barTwoIndex].style;
              let tempHeight = arrayBars[barOneIndex].style.height;
              barOneStyle.height = `${arrayBars[barTwoIndex].style.height}`;
              barTwoStyle.height = `${tempHeight}`;
              
              // Swap the values (text) too!
              if (arrSize < 35) {
                barValues[barOneIndex].innerHTML = barValues[barTwoIndex].innerHTML.toString();
                barValues[barTwoIndex].innerHTML = tempHeight.toString().slice(0, -2);
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
      // Set all colors to green when done (looks fancy :). 
      setTimeout(() => {
        for (let i = 0; i < arrayBars.length; i++) {
          setTimeout(() => {
            arrayBars[i].style.backgroundColor = '#06a605';
          }, (i * speed - 1));
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
    function menuClick(event) {
      setAnchorEl(event.currentTarget);
    };
    function handleMenuItemClick(item) {
      menuClose();
      setMenuValue(item);
    }
    function menuClose() {
      setAnchorEl(null);
    };


    //#endregion

    //#region Component

    return (
        <div className="sorting">
            <div className="sorting--container">
                <div className="sorting--description">

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
                        <MenuItem value={'BubbleSort'} >
                          <div className="form--menuItem"> 
                            <div>
                              Bubble Sort
                            </div>
                            <BubbleChartIcon />
                          </div>
                        </MenuItem>
                        <MenuItem value={'SelectionSort'} >
                          <div className="form--menuItem"> 
                            <div>
                              Selection Sort
                            </div>
                            <SwipeIcon />
                          </div>
                        </MenuItem>
                        <MenuItem value={'InsertionSort'} >
                          <div className="form--menuItem"> 
                            <div>
                              Insertion Sort
                            </div>
                            <StyleIcon />
                          </div>
                        </MenuItem>
                        <MenuItem value={'QuickSort'} >
                          <div className="form--menuItem"> 
                            <div>
                              Quick Sort
                            </div>
                            <BoltIcon />
                          </div>
                        </MenuItem>
                        <MenuItem value={'MergeSort'} >
                          <div className="form--menuItem"> 
                            <div>
                              Merge Sort
                            </div>
                            <MergeIcon />
                          </div>
                        </MenuItem>
                        <MenuItem value={'HeapSort'} >
                          <div className="form--menuItem"> 
                            <div>
                              Heap Sort
                            </div>
                            <HorizontalSplitIcon />
                          </div>
                        </MenuItem>
                        <MenuItem value={'TimSort'} >
                          <div className="form--menuItem"> 
                            <div>
                              Tim Sort
                            </div>
                            <MoreTimeIcon />
                          </div>
                        </MenuItem>
                        <MenuItem value={'RadixSort'} >
                          <div className="form--menuItem"> 
                            <div>
                              Radix Sort
                            </div>
                            <SwitchAccessShortcutIcon />
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
                                pointerEvents: `all !important`,
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
                              '&.MuiSlider-rail': {
                                opacity: 0.28,
                                pointerEvents: `none !important`,
                              }
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


                  <Divider className="darkMode" />
                  <div className="form--controlsTitle">Learn <InfoIcon fontSize="large" /></div>
                  <Divider className="darkMode" />
                  <div className="form--info">
                      <Button
                          className="form--menu"
                          aria-controls={open ? 'basic-menu' : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? 'true' : undefined}
                          onClick={menuClick}
                        >
                        <MenuIcon />
                      </Button>
                      <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={menuClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem onClick={() => handleMenuItemClick('Description')}>Description</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('Pseudocode')}>Pseudocode</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('Performance')}>Performance</MenuItem>
                        <MenuItem onClick={() => handleMenuItemClick('Further Learning')}>Further Learning</MenuItem>

                      </Menu> 
                      {arrayOfObjects &&
                      arrayOfObjects.map(item => (
                        <Description key={item.ID} page={tabValue} info={item} />
                      ))}           
                  </div>

                </div>
                <Divider className="darkMode" />
                <div className="sorting--box">
                     <div className="visualizer--container">
                      <div className="visualizer--bars">
                        {arr.map((value, index) => (
                          <div className="bar--stack">
                            <div className="visualizer--barValues">
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