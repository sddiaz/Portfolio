import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function Arrows(props) {
    const [waiting, setWaiting] = useState(true);
    const [showRightArrow, setShowRightArrow] = useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setWaiting(false);
        }, 5000);
    }, []);

    const numberOfSections = 5; // Update this with the actual number of sections

    return (
        <div className={`arrows ${waiting ? "hidden" : "visible"}`}>
            <IconButton size="large">
                <ArrowCircleLeftIcon fontSize="inherit" className={props.scrollValue > window.innerWidth ? "visible" : "hidden"}/>
            </IconButton>
            <IconButton size="large">
               <ArrowCircleRightIcon fontSize="inherit" className={props.scrollValue < window.innerWidth * 4 - 1 ? "visible" : "hidden"}/>
            </IconButton>
        </div>
    );
}

export default Arrows;
