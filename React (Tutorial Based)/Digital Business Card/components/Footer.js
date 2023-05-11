import React from "react"

export default function Footer() {
    return (
        <div className="footer"> 
            <button onClick={instagram}><i style={{ color: '#1E1F26'}} className="fa fa-instagram"></i></button>
            <button onClick={github}><i style={{ color: '#1E1F26'}} className="fa fa-github"></i></button>
        </div>
    )
}
function instagram() {
    window.open('https://www.instagram.com/cautified/')
}
function github() {
    window.open('https://github.com/sddiaz')
}