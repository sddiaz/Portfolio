import React, { useEffect, useState } from "react"
import { CopyBlock, dracula } from "react-code-blocks";
import { AgGridReact } from "ag-grid-react";
import QuadraticFunctionChart from "./Graph";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Description({page, info, menuValue}) {

    const pseudocodeStlye = {
        maxWidth: '150%',
        fontSize: '15px',
        overflowY: 'none',
        overflowX: 'scroll',
    }
    const codeBlockStyle = {
        marginBottom: '25px',
    }
    const [rowData, setRowData] = useState([]);
    const [columnDefs] = useState([
        { field: 'Case', width: 'auto' },
        { field: 'TimeComplexity' },
        { field: 'SpaceComplexity' }
    ]);
    // Get Performance Data
    useEffect(() => {
        if (info.Performance) {
            setRowData([
                {Case: "Average Case", TimeComplexity: info.Performance.AverageCase.Time, SpaceComplexity: info.Performance.AverageCase.Space},
                {Case: "Worst Case", TimeComplexity: info.Performance.WorstCase.Time, SpaceComplexity: info.Performance.AverageCase.Space},
                {Case: "Best Case", TimeComplexity: info.Performance.BestCase.Time, SpaceComplexity: info.Performance.AverageCase.Space},
            ]);
        }
    }, [info]);

    const gridOptions = {
        // set background colour on every row, this is probably bad, should be using CSS classes
        rowStyle: { background: 'black' },
    }

    return (
        // This class logic allows us to toggle 
        // varying pages via props.
        <div className={page != info.ID ? 'hidden' : 'sorting--descriptionContainer'}>
            <div className={menuValue == 'Description' ? 'description--main' : 'hidden'}>
                {info.Description}
            </div>
           {info.Pseudocode && 
            <div className={menuValue == 'Implementation' ? 'description--pseudocode' : 'hidden'} style={{padding: '10px'}}> 
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
                        showLineNumbers/>
                    </div>
                    <div style={codeBlockStyle}>
                        Python
                        <CopyBlock 
                        theme={dracula} 
                        language={'python'} 
                        text={info.Pseudocode.Python}
                        customStyle={pseudocodeStlye} 
                        showLineNumbers/>
                    </div> 
            </div>
            }
            <div className={menuValue == 'Performance' ? 'description--performance' : 'hidden'}>
                <div className="graph-container">
                    <div className="graph--title">
                            Algorithm Complexity
                    </div>
                    <div className="grid-container">
                        <div className="grid-row header">
                            <div className="grid-item">Case</div>
                            <div className="grid-item">Time</div>
                            <div className="grid-item">Space</div>
                        </div>
                        <div className="grid-row">
                            <div className="grid-item">Average Case</div>
                            <div className="grid-item">{info.Performance && info.Performance.AverageCase.Time}</div>
                            <div className="grid-item">{info.Performance && info.Performance.AverageCase.Space}</div>
                        </div>
                        <div className="grid-row">
                            <div className="grid-item">Worst Case</div>
                            <div className="grid-item">{info.Performance && info.Performance.WorstCase.Time}</div>
                            <div className="grid-item">{info.Performance && info.Performance.WorstCase.Time}</div>
                        </div>
                        <div className="grid-row">
                            <div className="grid-item">Best Case</div>
                            <div className="grid-item">{info.Performance && info.Performance.BestCase.Time}</div>
                            <div className="grid-item">{info.Performance && info.Performance.BestCase.Time}</div>
                        </div>
                    </div>
                </div>
                <div className="graph-container">
                    <div className="graph--title">
                            Growth Visualization
                    </div>
                    {info.Performance != null && 
                    <QuadraticFunctionChart page={page} info={info.Performance} />}
                </div>
            </div>
        </div>
    );

};

export default Description;