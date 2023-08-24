import React, { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';


function Arrows() {

    //#region Variables

    const [waiting, setWaiting] = useState(true);
    const [scrollValue, setScrollValue] = useState(0);
    
    //#endregion

    //#region Methods

    useEffect(() => {
        setTimeout(() => {
            setWaiting(false);
        }, 5000);
    }, []);

    // Scroll / Resize listeners for Dynamic Arrows
    useEffect(() => {
        document.addEventListener("scroll", handleScroll);
        document.addEventListener("resize", handleResize);
        return () => {
          document.removeEventListener("resize", handleResize);
          document.addEventListener("scroll", handleScroll);

        };
    }, []);

    
    function handleResize() {
        setScreenWidth(window.innerWidth);
    }

    function handleScroll() {
        const scroll = document.documentElement.scrollTop;
        setScrollValue(scroll);
    };

    function handleClick() {
        const windowHeight = window.innerHeight;
        window.scrollTo({
        top: windowHeight,
        behavior: 'smooth', // You can adjust the scroll behavior as needed
        });
    }

    // Hide IconButtons if arrows aren't showing
    function checkArrow() {
        const arrow = document.getElementById("arrow");
        return arrow && arrow.classList.toString().includes("hidden");
    }

    //#endregion

    //#region App

    return (
        <div className={`arrows ${waiting && scrollValue < window.innerHeight - 1 ? "hidden" : "visible"}`}>
            <IconButton size="large" onClick={handleClick} className={scrollValue > window.innerHeight - 1? "hidden" : "visible"}  >
                <Tooltip placement="top" arrow title="Get Started">
                <ArrowCircleDownIcon id="arrow" fontSize="inherit" className={scrollValue > window.innerHeight - 1 ? "hidden" : "visible"}  />
                </Tooltip>
            </IconButton>
        </div>
    );

    //#endregion
}

export default Arrows;
