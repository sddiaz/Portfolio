import React, { useEffect } from "react"
import { CopyBlock, dracula} from "react-code-blocks";

function Description({page, info, menuValue}) {

    const pseudocodeStlye = {
        maxWidth: '150%',
        fontSize: '15px',
        overflowY: 'none',
        overflowX: 'scroll',
    }
    const codeBlockStyle = {
        marginBottom: '10px',
    }
    return (
        // This class logic allows us to toggle 
        // varying pages via props.
        <div className={page != info.ID ? 'hidden' : 'sorting--descriptionContainer'}>
            <div className={menuValue == 'Description' ? 'description--main' : 'hidden'}>
                {info.Description}
            </div>
           {info.Pseudocode && 
            <div className={menuValue == 'Pseudocode' ? 'description--pseudocode' : 'hidden'} style={{padding: '10px'}}> 
                    <div style={codeBlockStyle}>
                        JavaScript
                        <CopyBlock 
                        theme={dracula} 
                        language={'javascript'} 
                        text={info.Pseudocode.JavaScript}
                        customStyle={pseudocodeStlye} 
                        showLineNumbers
                        />
                    </div>
                    <div style={codeBlockStyle}>
                        C++
                        <CopyBlock 
                        theme={dracula} 
                        language={'cpp'} 
                        text={info.Pseudocode.CPP}
                        customStyle={pseudocodeStlye} 
                        showLineNumbers
                        wrapLongLines/>
                    </div>
                    <div style={codeBlockStyle}>
                        Python
                        <CopyBlock 
                        theme={dracula} 
                        language={'python'} 
                        text={info.Pseudocode.Python}
                        customStyle={pseudocodeStlye} 
                        showLineNumbers
                        wrapLongLines/>
                    </div> 
            </div>
            }
            <div className={menuValue == 'Performance' ? 'description--performance' : 'hidden'}>
                {info.Performance}
            </div>
            <div className={menuValue == 'FurtherLearning' ? 'description--furtherLearning' : 'hidden'}>
                {info.FurtherLearning}
            </div>
        </div>
    );

};

export default Description;