import React from "react"

function Description({page, info, menuValue}) {

    return (
        // This class logic allows us to toggle 
        // varying pages via props.
        <div className={page != info.ID ? 'hidden' : 'sorting--descriptionContainer'}>
            <div className={menuValue == 'Description' ? 'description--main' : 'hidden'}>
                {info.Description}
            </div>
            <div className={menuValue == 'Pseudocode' ? 'description--main' : 'hidden'}>
                {info.Pseudocode}
            </div>
            <div className={menuValue == 'Performance' ? 'description--main' : 'hidden'}>
                {info.Performance}
            </div>
            <div className={menuValue == 'FurtherLearning' ? 'description--main' : 'hidden'}>
                {info.FurtherLearning}
            </div>
        </div>
    );

};

export default Description;