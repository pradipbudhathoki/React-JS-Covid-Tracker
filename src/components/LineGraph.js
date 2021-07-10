import React from "react";
import "./LineGraph.css";
import { useState, useEffect } from "react";
import numeral from "numeral";
import { Line } from "react-chartjs-2";
import { BorderColor } from "@material-ui/icons";

const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesType) => {
  let chartData = [];
  let lastDataPoint;
  for (let date in data.cases) {
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph(props) {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      await fetch("https://disease.sh/v3/covid-19/historical/NP?lastdays=90")
        .then((response) => response.json())
        .then((data) => {
          //   console.log(data);
          let chartData = buildChartData(data.timeline, props.casesType);
          //   console.log("ChartData, ", chartData);
          setData(chartData);
        });
    };

    fetchData();
  }, [props.casesType]);

  //   console.log("Data: ", data);
  const COLOR = {
    deaths: ["rgba(204,16,52,0.5)", "#CC1034"],
    cases: ["#AFCBFA", "#1967D2"],
    recovered: ["#ccffcc", "#00e600"],
  };

  return (
    <div>
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                // backgroundColor: "rgba(204,16,52,0.5)",
                // borderColor: "#CC1034",
                backgroundColor: COLOR[props.casesType][0],
                borderColor: COLOR[props.casesType][1],
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
