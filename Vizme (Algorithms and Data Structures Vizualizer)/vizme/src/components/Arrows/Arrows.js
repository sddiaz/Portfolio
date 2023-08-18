import React from "react";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';

function Arrows() {

    return (
        <div className="arrows">
            <IconButton size="large" >
                <ArrowCircleLeftIcon fontSize="inherit"/>
            </IconButton>
            <IconButton size="large" >
                <ArrowCircleRightIcon fontSize="inherit"/>
            </IconButton>
        </div>
    );

};

export default Arrows;