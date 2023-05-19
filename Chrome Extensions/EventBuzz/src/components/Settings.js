import React from "react";

export default function Settings({ onLeftClick, onRightClick, onSort }) {
    return (
        <div class="settings--main">
            <div class="settings--left">
                <button onClick={onLeftClick} class="settings--btn"><img title="Page Left" class="settings--img" src="https://i.ibb.co/Z2PVkxF/left-arrow.png" alt="left-arrow" /></button>
                <button onClick={onRightClick} class="settings--btn"><img title="Page Right" class="settings--img" src="https://i.ibb.co/WvXgqZ9/right-arrow.png" alt="right-arrow" /></button>
                <button onClick={onSort} class="filter--btn"><img title="Sort by Date" class="filter--img" src="https://i.ibb.co/0GMWHtb/calendar-1.png" alt="right-arrow" /></button>
            </div>
            <div class="settings--right">
                <button class="save--btn"><img title="Favorite" class="save--img" src="https://i.ibb.co/K2TBTsS/favorite-filled.png" alt="right-arrow" /></button>
            </div>
        </div>
    );
}