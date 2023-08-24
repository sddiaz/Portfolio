import React, { useState, useEffect } from "react";

function Progress() {
    const [scrollPositions, setScrollPositions] = useState([false, false, false]);
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const newScrollPositions = [false, false, false];
            
            for (let i = 0; i < 3; i++) {
                newScrollPositions[i] = document.documentElement.scrollTop > (window.innerHeight * (i + 1) - 1);
            }
            
            setScrollPositions(newScrollPositions);

            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const currentScroll = document.documentElement.scrollTop;
            const progress = (currentScroll / maxScroll) * 75;
            setScrollProgress(progress);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="progress">
            <div className="progress--container">
                <div className="progress--bar" id="bar" style={{ width: `${scrollProgress}%` }} />
                <div className={`progress--notch glow`} />
                <div className={`progress--notch ${scrollPositions[0] ? "glow" : ""}`} />
                <div className={`progress--notch ${scrollPositions[1] ? "glow" : ""}`} />
                <div className={`progress--notch ${scrollPositions[2] ? "glow" : ""}`} />
            </div>
        </div>
    );
}

export default Progress;
