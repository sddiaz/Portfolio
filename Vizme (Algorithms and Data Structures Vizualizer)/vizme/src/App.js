import { useState } from "react";
import './App.css';
import Loader from "./components/Loader/Loader";
import Welcome from "./components/Welcome/Welcome";
import Sorting from "./components/Sorting/Sorting";
import Graphs from "./components/Graphs/Graphs";
import DataStructures from "./components/Data Structures/DataStructures";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="App">
       <Loader/>
       <Welcome className="child"/>
       <Sorting className="child"/>
       <Graphs className="child"/>
       <DataStructures className="child"/>
       <Footer className="child"/>
    </div>
  );
}

export default App;
