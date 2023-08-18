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

    function checkLeftArrow() {
        const left = document.getElementById("leftArrow");
        return left && left.classList.toString().includes("hidden");
    }

    function checkRightArrow() {
        const right = document.getElementById("rightArrow");
        return right && right.classList.toString().includes("hidden");
    }
    

    return (
        <div className={`arrows ${waiting ? "hidden" : "visible"}`}>
            <IconButton size="large" onClick={handleLeftClick} className={checkLeftArrow() ? "hidden" : ""}>
                <ArrowCircleLeftIcon id="leftArrow" fontSize="inherit" className={props.scrollValue > window.innerWidth - 1 ? "visible" : "hidden"}/>
            </IconButton>
            <IconButton size="large" onClick={handleRightClick} className={checkRightArrow() ? "hidden" : ""}>
               <ArrowCircleRightIcon id="rightArrow" fontSize="inherit" className={props.scrollValue < window.innerWidth * 4 - 1 ? "visible" : "hidden"}/>
            </IconButton>
        </div>
    );
}

export default Arrows;
