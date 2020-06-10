import React, { useState } from 'react';
import './ChartPage.css';
// import Chart from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Dropzone from 'react-dropzone'

function ChartPage() {
    // const [labels, setLabels] = useState([
    // 'January', 'February', 'March',
    // 'April', 'May']);

    // const [dataSets, setDataSets] = useState([{
    //     label: 'Rainfall',
    //     backgroundColor: 'rgba(75,192,192,1)',
    //     borderColor: 'rgba(0,0,0,1)',
    //     borderWidth: 2,
    //     data: [65, 59, 80, 81, 56]
    //   }]);

    const [data, setData] = useState({
        labels: ['January', 'February', 'March',
                 'April', 'May'],
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: [65, 59, 80, 81, 56]
          }
        ]
      });

    return(
        <div className="chartPageContainer">
            <h1>Time Sheet Charts</h1>
            <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                {({getRootProps, getInputProps}) => (
                    <section>
                    <div className="dropZone" {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drag 'n' drop some files here, or click to select files</p>
                    </div>
                    </section>
                )}
            </Dropzone>
            <Bar
            data={data}
            options={{
                title: {
                    display: true,
                    text: 'Average Rainfall Per Month',
                    fontSize: 20
                },
                legend: {
                    display: true,
                    position: 'right'
                }
            }}
            />
        </div>
    );
}

export default ChartPage;