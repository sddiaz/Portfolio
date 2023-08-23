import React, { useState, useEffect } from "react";
import './App.css';
import Loader from "./components/Loader/Loader";
import Welcome from "./components/Welcome/Welcome";
import Sorting from "./components/Sorting/Sorting";
import Graphs from "./components/Graphs/Graphs";
import DataStructures from "./components/Data Structures/DataStructures";
import Footer from "./components/Footer/Footer";
import Cursor from "./components/Cursor/Cursor";
import Arrows from "./components/Arrows/Arrows";
import Progress from "./components/Progress/Progress";

function App() {
  const [scrollValue, setScrollValue] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [scrollIndex, setScrollIndex] = useState(0);

  const handleScroll = () => {
    const scrollX = document.querySelector(".App").scrollLeft;
    const scrollSections = Array.from({ length: 5 }, (_, index) => index * window.innerWidth);
    const newIndex = findClosestIndex(scrollSections, scrollX);
    setScrollValue(scrollX);
    console.log(newIndex);
    setScrollIndex(newIndex);
  };

  const handleResize = () => {
    setScreenWidth(window.innerWidth);
  }

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

  useEffect(() => {
    const appElement = document.querySelector(".App");

    appElement.addEventListener("scroll", handleScroll);
    appElement.addEventListener("resize", handleResize);
    return () => {
      appElement.removeEventListener("scroll", handleScroll);
      appElement.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="App">
      <Cursor />
      <Loader />
      <Progress />
      <Arrows scrollValue={scrollValue} screenWidth={screenWidth} scrollIndex={scrollIndex}/>
      <div className="sectionContainer">
        <Welcome className="child" />
      </div>
      <div className="sectionContainer">
        <Sorting className="child" />
      </div>
      <div className="sectionContainer">
        <Graphs className="child" />
      </div>
      <div className="sectionContainer">
        <DataStructures className="child" />
      </div>
      <div className="sectionContainer">
        <Footer className="child" />
      </div>
    </div>
  );
}

export default App;
