import React, { useEffect } from "react";

function Cursor() {
    useEffect(() => {
        const cursor = document.getElementById('cursor');
        const littleCursor = document.getElementById('littleCursor');
        const forbiddenElements = document.querySelectorAll('h1');

        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px'; 
            cursor.style.top = e.clientY + 'px'; 
            littleCursor.style.left = e.clientX + 'px'; 
            littleCursor.style.top = e.clientY + 'px'; 
        });

        document.addEventListener('mousedown', function(e) {
            cursor.style.height = '66px' 
            cursor.style.width = '66px' 
        })

        document.addEventListener('mouseup', function(e) {
            cursor.style.height = '33px' 
            cursor.style.width = '33px' 
        })

        for (let i = 0; i < forbiddenElements.length; i++) {
            forbiddenElements[i].addEventListener('mouseenter', function() {
                cursor.classList.add('large-cursor');
                littleCursor.classList.add('littleLarge-cursor')
            });
            forbiddenElements[i].addEventListener('mouseleave', function() {
                cursor.classList.remove('large-cursor');
                littleCursor.classList.remove('littleLarge-cursor')
            });
        }
    }, []);

    return (
        <div className="cursor--wrapper">
            <div id="cursor" className="cursor"></div>
            <div id="littleCursor" className="littleCursor"></div>
        </div>
    );
}

export default Cursor;
