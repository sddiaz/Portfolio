import React from "react";
import './App.css';
import Loader from "./components/Loader/Loader";
import Welcome from "./components/Welcome/Welcome";
import Sorting from "./components/Sorting/Sorting";
import Graphs from "./components/Graphs/Graphs";
import DataStructures from "./components/Data Structures/DataStructures";
import Footer from "./components/Footer/Footer";
import Cursor from "./components/Cursor/Cursor";
import Arrow from "./components/Arrow/Arrow";
import Progress from "./components/Progress/Progress";

function App() {

  return (
    <div className="App">
      <Cursor />
      <Loader />
      <Progress />
      <Arrow />
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
      <div>
        <Footer className="child" />
      </div>
    </div>
  );
}

export default App;
