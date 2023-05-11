import React from "react"
import Banner from "./components/Banner"
import Cards from "./components/Cards"
import ScrollButton from "./components/ScrollButton"
import Footer from "./components/Footer"
import data from "./data"
export default function App() {
    const myCards = data.map(item => {
        return (
            <div>
            <Cards 
            key={item.id}
            {...item}
            />
            <hr/>
            </div>
        )
    }) 
    return (
     <div>
        <Banner />
        {myCards}
        <ScrollButton/>
        <Footer />
     </div>
    );
}