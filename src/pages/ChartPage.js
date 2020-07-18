import React, { useState } from 'react';
import './ChartPage.css';
// import Chart from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
// import Dropzone from 'react-dropzone'
import XLSX from 'xlsx';
import { number } from 'yargs';

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
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const [valuesArray, setValuesArray] = useState([]);

    // Create an object that has skill name, with a dictionary of date:hours
    const [skillObjects, setSkillObjects] = useState([]);

    var skillObject = {
        name: "",
        data: {
            date: "date",
            amountOfHours: "hours"
        }
    };

    // const [data, setData] = useState({
    //     labels: ['January', 'February', 'March',
    //              'April', 'May'],
    //     datasets: [
    //       {
    //         label: 'Rainfall',
    //         backgroundColor: 'rgba(75,192,192,1)',
    //         borderColor: 'rgba(0,0,0,1)',
    //         borderWidth: 2,
    //         data: [65, 59, 80, 81, 56]
    //       }
    //     ]
    // });

    const state = {
        labels: months,
        datasets: [
          {
            label: 'Reading Hours',
            fill: true,
            lineTension: 0.5,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: valuesArray
          }
        ]
    };

    function convertExcelToJson(event) {
        var files = event.target.files; // Grab all the work sheets from the excel file
        var fileSheet = files[0]; // Grab the first file

        const reader = new FileReader(); // Create a file reading

        reader.onload = (event) => { // event is when the file is selected
            /* Parse data */
            const binaryString = event.target.result;
            const workBook = XLSX.read(binaryString, {
                type:'binary',
                cellDates: true
            });

            /* Get first worksheet */
            const workSheetName = workBook.SheetNames[0];
            const workSheet = workBook.Sheets[workSheetName];

            /* Convert array of arrays */
            // const data = XLSX.utils.sheet_to_json(workSheet, {header:1});
            const data = XLSX.utils.sheet_to_json(workSheet, {header:1});

            // console.log("Data:", data);

            // Set skill labels
            var skillLabels = data[2];
            skillLabels.shift();
            console.log(skillLabels);
            setLabels(skillLabels);

            // Get all the dates
            var row;
            var datesArray = [];
            var monthsAndValues = {};
            var monthsAndValuesArray = [];

            for (row in data) {
                if (data[row][0] && data[row][0] instanceof Date) { // Check to see if fields not empty
                    var excelDate = data[row][0];
                    var excelMonth = data[row][0].getMonth();
                    // console.log(excelDate.toLocaleDateString());
                    // console.log(excelDate.getMonth());

                    if (row > 3 && data[row][1]) { // if it is greater than row 3 and the cell exists
                        if (excelMonth in monthsAndValues) { // if the month is already in the object, add to it
                            monthsAndValues[excelMonth] += data[row][1];
                        } else { // if excel month is not in the object, define it and add to it
                            monthsAndValues[excelMonth] = 0;
                            monthsAndValues[excelMonth] += data[row][1];
                        }
                    }

                    // Push date strings
                    datesArray.push(excelDate.toLocaleDateString());
                }
            }

            Object.keys(monthsAndValues).forEach((key, index) => {
                // console.log(monthsAndValues[key]);
                monthsAndValuesArray.push(monthsAndValues[key]);
            });

            roundAllHours(monthsAndValuesArray);
            setValuesArray(monthsAndValuesArray);

            console.log(monthsAndValuesArray);

            setDates(datesArray);
            // console.log(datesArray);

        };

        reader.readAsBinaryString(fileSheet);
    }

    // Helper function to round all numbers to 2 decimal places
    function roundAllHours(hours) {
        var number;

        for (number in hours) {
            hours[number] = (Math.round(hours[number] * 100) / 100);
        }
    }

    return(
        <div className="chartPageContainer">
            <h1>Time Sheet Charts</h1>
            <input
                accept=".xlsx"
                type="file"
                onChange={(event) => convertExcelToJson(event)}
            />
            {/* <Bar
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
            /> */}
            <Line 
                data={state}
                options={{
                    title:  {
                        display: true,
                        text: "Reading",
                        fontSize: 20,
                    },
                    legend: {
                        display: true,
                        position: "right"
                    }
                }}
            />
        </div>
    );
}

export default ChartPage;