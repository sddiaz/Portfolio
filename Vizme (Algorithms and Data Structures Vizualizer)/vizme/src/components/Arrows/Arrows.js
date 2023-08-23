import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

const scrollSections = Array.from({ length: 5 }, (_, index) => index * window.innerWidth);

function Arrows(props) {
    const [waiting, setWaiting] = useState(true);
    const [scrollIndex, setScrollIndex] = useState(props.scrollIndex);
    
    useEffect(() => {
        setTimeout(() => {
            setWaiting(false);
        }, 5000);
    }, []);

    useEffect(() => {
        const appElement = document.querySelector(".App");
    
        appElement.addEventListener("scroll", handleScroll);
        return () => {
          appElement.removeEventListener("scroll", handleScroll);
        };
    }, []);

    function handleLeftClick() {
        let newIndex = Math.max(0, scrollIndex - 1);
        let newScrollValue = scrollSections[newIndex];
        const appElement = document.querySelector(".App");
        setScrollIndex(newIndex);
        smoothScrollTo(appElement, newScrollValue);
    }
    
    function handleRightClick() {
        let newIndex = Math.min(4, scrollIndex + 1);
        let newScrollValue = scrollSections[newIndex];
        const appElement = document.querySelector(".App");
        setScrollIndex(newIndex);
        smoothScrollTo(appElement, newScrollValue);
    }

    function smoothScrollTo(element, scrollValue) {
        element.scrollTo({
            left: scrollValue,
            behavior: "smooth",
        });
    }

    // Hide IconButtons if arrows aren't showing
    function checkLeftArrow() {
        const left = document.getElementById("leftArrow");
        return left && left.classList.toString().includes("hidden");
    }

    function checkRightArrow() {
        const right = document.getElementById("rightArrow");
        return right && right.classList.toString().includes("hidden");
    }

    const handleScroll = () => {
        const scrollX = document.querySelector(".App").scrollLeft;
        const scrollSections = Array.from({ length: 5 }, (_, index) => index * window.innerWidth);
        const newIndex = findClosestIndex(scrollSections, scrollX);
        setScrollIndex(newIndex);
    };

    const findClosestIndex = (array, target) => {
    let closestIndex = 0;
    let closestDifference = Number.MAX_SAFE_INTEGER;

    array.forEach((value, index) => {
        const difference = Math.abs(value - target);
        if (difference < closestDifference) {
            closestDifference = difference;
            closestIndex = index;
        }
    });

    return closestIndex;
    };

    return (
        <div className={`arrows ${waiting ? "hidden" : "visible"}`}>
            <IconButton size="large" onClick={handleLeftClick} className={checkLeftArrow() ? "hidden" : ""}>
                <ArrowCircleLeftIcon id="leftArrow" fontSize="inherit" className={props.scrollValue > window.innerWidth - 1 ? "visible" : "hidden"} />
            </IconButton>
            <IconButton size="large" onClick={handleRightClick} className={checkRightArrow() ? "hidden" : ""}>
               <ArrowCircleRightIcon id="rightArrow" fontSize="inherit" className={props.scrollValue < window.innerWidth * 4 - 1 ? "visible" : "hidden"} />
            </IconButton>
        </div>
    );
}

export default Arrows;
