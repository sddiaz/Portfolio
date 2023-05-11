import React from "react"
function someFunction() {
  alert("You found a secret button :) \nHere's your secret: search your system preferences for\n'dark mode', change them and see what happens!")
}
export default function Banner() {
    return (
      <div className="banner">
       <input onClick={someFunction} id="secretButton" className="banner--img" type="image" src="https://gcdnb.pbrd.co/images/7OnyNISqWsnH.png?o=1" height="20px" />
        <h1 className="banner--title">my travel journal.</h1>
      </div>  
    );
}