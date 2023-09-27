import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';

function QuadraticFunctionChart({page, info}) {

    const [gridData, setGridData] = useState(null);
    const rootStyles = getComputedStyle(document.documentElement);
    const accentColor = rootStyles.getPropertyValue('--accent');

    useEffect(() => {
        if (info != null) {
            console.log(JSON.stringify(info));
            setGridData([
                  {
                    id: 'Average Case',
                    data: info.AverageCase.Data
                  },
                  {
                    id: 'Worst Case',
                    data: info.WorstCase.Data
                  },
                  {
                    id: 'Best Case',
                    data: info.BestCase.Data
                  }
                ]
            )
        }
    }, [info]);

    function findObjectById(info, desiredID) {
        for (let i = 0; i < info.length; i++) {
            if (info[i].ID === desiredID) {
                return info[i];
            }
        }
        return null;
    }

    const theme = {
        "background": "transparent",
        "text": {},
        "axis": {
            "domain": {
                "line": {
                    "stroke": "#777777",
                    "strokeWidth": 1
                }
            },
            "legend": {
                "text": {
                    "fontSize": 12,
                    "fill": accentColor,
                    "outlineWidth": 3,
                    "outlineColor": "white"
                }
            },
            "ticks": {
                "line": {
                    "stroke": "#777777",
                    "strokeWidth": 1
                },
                "text": {
                    "fontSize": 11,
                    "fill": accentColor,
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            }
        },
        "grid": {
            "line": {
                "stroke": "#ffffff",
                "strokeWidth": 1
            }
        },
        "legends": {
            "title": {
                "text": {}
            },
            "text": {
                "fontSize": 11,
                "fill": accentColor,
                "outlineWidth": 0,
                "outlineColor": "#ffffff"
            },
            "ticks": {
                "line": {},
                "text": {
                    "fontSize": 10,
                    "fill": accentColor,
                    "outlineWidth": 0,
                    "outlineColor": "transparent"
                }
            }
        },
        "annotations": {},
        "tooltip": {}
    }
    // ... and so on for other variables
    return (
        <div className='graph'>
        {info.ID == page && 
        <ResponsiveLine
            data={gridData}
            margin={{ right: 60, bottom: 50, left: 60 }}
            xScale={{ type: 'linear', min: 1 }}
            yScale={{ type: 'linear', min: 'auto', max: 'auto', stacked: false, reverse: false }}
            curve="monotoneX"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                legend: 'Input Size (n)',
                legendPosition: 'middle',
                legendOffset: 35,
                orient: 'bottom',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
            }}
            axisLeft={{
                orient: 'left',
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'Time',  // Label for the left axis
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={{ scheme: 'pink_yellowGreen' }}
            theme={theme}
            enableCrosshair={false}
            enableSlices={false}
            enableGridX={false}
            enableGridY={false}
            lineWidth={5}
            enablePoints={false}
            enableArea={false}
            legends={[
                {
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: '100%',
                    translateY: '-100%',
                    itemsSpacing: 0,
                    itemDirection: 'left-to-right',
                    itemWidth: 80,
                    itemHeight: 20,
                    itemOpacity: 0.75,
                    symbolSize: 12,
                    symbolShape: 'circle',
                    symbolBorderColor: 'rgba(0, 0, 0, .5)',
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemBackground: 'rgba(0, 0, 0, .03)',
                                itemOpacity: 1
                            }
                        }
                    ]
                }
            ]}
        />}
        </div>
    )
};

export default QuadraticFunctionChart;
