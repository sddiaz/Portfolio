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

function App() {
  const [scrollValue, setScrollValue] = useState(0);

  const handleScroll = () => {
    const scrollX = document.querySelector(".App").scrollLeft;
    setScrollValue(scrollX);
  };

  useEffect(() => {
    const appElement = document.querySelector(".App");
    appElement.addEventListener("scroll", handleScroll);
    return () => {
      appElement.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <Cursor />
      <Loader />
      <Arrows scrollValue={scrollValue} />
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
