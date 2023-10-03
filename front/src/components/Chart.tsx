import { useEffect } from "react";
import { Chart } from "chart.js/auto";
import { createColors } from "../utils";
const RatingChart = ({
 data,
}: {
 data: { rating: number; count: number }[];
}) => {
 useEffect(() => {
  const canvas = document.getElementById("myChart1") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d");
  if (window.myChart) {
   window.myChart.destroy();
  }

  window.myChart = new Chart(ctx!, {
   type: "doughnut",
   options: {
    indexAxis: "y",
    maintainAspectRatio: false,
    plugins: {
     legend: {
      display: false,
     },
    },
    elements: {
     arc: {
      borderRadius: 10,
     },
    },
    animation: {
     animateRotate: true,
     animateScale: true,
    },
   },
   data: {
    labels: data.map((record) => record.rating),
    datasets: [
     {
      data: data.map((record) => record.count),
      backgroundColor: createColors(),
     },
    ],
   },
  });
 }, []);

 return (
  <div className="w-full h-full flex mx-auto my-auto">
   <canvas id="myChart1" className="w-full"></canvas>
  </div>
 );
};

export default RatingChart;
