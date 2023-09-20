import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';

function QuadraticFunctionChart({page, info}) {

    const [gridData, setGridData] = useState(null);
    const [currentInfo, setCurrentInfo] = useState(null);
    const rootStyles = getComputedStyle(document.documentElement);
    const accentColor = rootStyles.getPropertyValue('--accent');

    // Varying Functions for each Algorithm
    const dataOptions = [
      {
        id: 'O(n log n)',
        data: [
            { x: 1, y: 0 },
            { x: 2, y: 0.602060 },
            { x: 3, y: 1.431364 },
            { x: 4, y: 2.408240 },
            { x: 5, y: 3.494850 },
        ],
      },
      {
        id: 'O(n)',
        data: [
          { x: 1, y: 1 },
          { x: 2, y: 2 },
          { x: 3, y: 3 },
          { x: 4, y: 4 },
          { x: 5, y: 5 },
        ],
      },
      {
        id: 'O(n²)',
        data: [
          { x: 1, y: 1 },
          { x: 2, y: 4 },
          { x: 3, y: 9 },
          { x: 4, y: 16 },
          { x: 5, y: 25 },
        ],
      },
    ];

    useEffect(() => {
        if (info.Performance != null && page != null) {
            for (const key in info) {
                if (info[key].ID == page) {
                    setCurrentInfo(info[key]);
                    break;
                }
            }
        }
    }, [info])   

    useEffect(() => {
        if (currentInfo != null) {
            setGridData([
                  {
                    id: 'Average Case',
                    data: dataOptions.find(option => option.id === currentInfo.Performance.AverageCase.Time).data
                  },
                  {
                    id: 'Worst Case',
                    data: dataOptions.find(option => option.id === currentInfo.Performance.WorstCase.Time).data
                  },
                  {
                    id: 'Best Case',
                    data: dataOptions.find(option => option.id === currentInfo.Performance.BestCase.Time).data
                  }
                ]
            )
        }
    }, [currentInfo]);


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
        {gridData != null && 
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
            enableGridX={false}
            enableGridY={false}
            lineWidth={3}
            enablePoints={false}
            enableArea={false}
            useMesh={false}
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
