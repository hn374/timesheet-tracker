import React, { useState } from 'react';
import './ChartPage.css';
// import Chart from 'chart.js';
import { Bar } from 'react-chartjs-2';
// import Dropzone from 'react-dropzone'
import XLSX from 'xlsx';

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

    const [labels, setLabels] = useState([]); // Set to all the titles of the skills
    const [dates, setDates] = useState([]); // Set to all the dates

    // Create an object that has skill name, with a dictionary of date:hours

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

    function convertExcelToJson(event) {
        var files = event.target.files; // Grab all the work sheets from the excel file
        var fileSheet = files[0]; // Grab the first file

        const reader = new FileReader(); // Create a file reading

        reader.onload = (event) => { // event is when the file is selected
            /* Parse data */
            const binaryString = event.target.result;
            const workBook = XLSX.read(binaryString, {
                type:'binary'
            });

            /* Get first worksheet */
            const workSheetName = workBook.SheetNames[0];
            const workSheet = workBook.Sheets[workSheetName];

            /* Convert array of arrays */
            // const data = XLSX.utils.sheet_to_json(workSheet, {header:1});
            const data = XLSX.utils.sheet_to_json(workSheet, {header:1});

            console.log("Data:", data);

            // Set skill labels
            var skillLabels = data[2];
            skillLabels.shift();
            console.log(skillLabels);
            setLabels(skillLabels);

            // console.log("Skill Names", data[2]);
        };

        // reader.readAsDataURL(event.target.files[0]);
        reader.readAsBinaryString(fileSheet);
    }

    return(
        <div className="chartPageContainer">
            <h1>Time Sheet Charts</h1>
            <input
                accept=".xlsx"
                type="file"
                onChange={(event) => convertExcelToJson(event)}
            />
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