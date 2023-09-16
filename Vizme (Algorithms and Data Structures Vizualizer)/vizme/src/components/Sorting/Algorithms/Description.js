import React from "react"

function Description({page, info}) {

    return (
        // This class logic allows us to toggle 
        // varying pages via props.
        <div className={page != info.ID ? 'hidden' : 'sorting--descriptionContainer'}>
            <div>
                {info.Description}
            </div>
            <div>
                {info.Pseudocode}
            </div>
            <div>
                {info.Performance}
            </div>
            <div>
                {info.FurtherLearning}
            </div>
        </div>
    );

};

export default Description;