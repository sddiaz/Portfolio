import React, { useState } from "react";
import Visualizer from "./SortingComponents/Visualizer";
import { Button, Slider } from "@mui/material";
import { styled, useTheme } from '@mui/material/styles';

function Sorting() {    

    //#region Variables

    const [duration, setDuration] = useState(100);
    const [resetKey, setResetKey] = useState(0.0);
    const [sliderPosition, setSliderPosition] = useState(10);
    const theme = useTheme();

    const resetArray = () => {
        setResetKey((prevKey) => prevKey + .1);
    }

    //#endregion


    return (
        <div className="sorting">
            <div className="sorting--container">
                <div className="sorting--description">
                        <div className="form--controls">
                            <Button className="form--generateBtn" variant="contained" onClick={resetArray}>New Array</Button>
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
                            {sliderPosition}
                        </div>
                        <div className="form--info">

                        </div>
                    </div>
                <div className="sorting--box">
                    <Visualizer length={sliderPosition} resetKey={resetKey}/>
                </div>
            </div>
        </div>
    );
}

export default Sorting;