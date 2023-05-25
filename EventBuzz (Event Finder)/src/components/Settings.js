import React from "react";
import leftArrow from "../images/left-arrow.png"
import rightArrow from "../images/right-arrow.png"
import filter from "../images/calendar (1).png"
import favorite from "../images/favorite-filled.png"

export default function Settings({ onLeftClick, onRightClick, onSort, onFavoriteClick }) {
    return (
        <div class="settings--main">
            <div class="settings--left">
                <button onClick={onLeftClick} class="settings--btn"><img title="Page Left" class="settings--img" src={leftArrow} alt="left-arrow" /></button>
                <button onClick={onRightClick} class="settings--btn"><img title="Page Right" class="settings--img" src={rightArrow} alt="right-arrow" /></button>
                <button onClick={onSort} class="filter--btn"><img title="Sort by Date" class="filter--img" src={filter} alt="right-arrow" /></button>
            </div>
            <div class="settings--right">
                <button onClick={onFavoriteClick} class="save--btn"><img title="View Favorites" class="save--img" src={favorite} alt="Favorites" /></button>
            </div>
        </div>
    );
}