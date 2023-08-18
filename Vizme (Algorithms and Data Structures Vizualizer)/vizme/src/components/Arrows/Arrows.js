import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function Arrows(props) {
    const [waiting, setWaiting] = useState(true);
    const [scrollValue, setScrollValue] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setWaiting(false);
        }, 5000);
    }, []);

    function handleLeftClick() {
        const sectionWidth = window.innerWidth;
        let newScrollValue = Math.max(0, scrollValue - sectionWidth);
        setScrollValue(newScrollValue);
        const appElement = document.querySelector(".App");
        smoothScrollTo(appElement, newScrollValue);
    }
    
    function handleRightClick() {
        const sectionWidth = window.innerWidth;
        let newScrollValue = scrollValue + sectionWidth;
        setScrollValue(newScrollValue);
        const appElement = document.querySelector(".App");
        smoothScrollTo(appElement, newScrollValue);
    }
    
    function smoothScrollTo(element, scrollValue) {
        element.scrollTo({
            left: scrollValue,
            behavior: "smooth",
        });
    }
    

    return (
        <div className={`arrows ${waiting ? "hidden" : "visible"}`}>
            <IconButton size="large" onClick={handleLeftClick}>
                <ArrowCircleLeftIcon fontSize="inherit" className={props.scrollValue > window.innerWidth ? "visible" : "hidden"}/>
            </IconButton>
            <IconButton size="large" onClick={handleRightClick}>
               <ArrowCircleRightIcon fontSize="inherit" className={props.scrollValue < window.innerWidth * 4 - 1 ? "visible" : "hidden"}/>
            </IconButton>
        </div>
    );
}

export default Arrows;
