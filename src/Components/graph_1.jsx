import React  from 'react';
import Chart from "react-apexcharts";

export const Graph1=({data})=>{

  var currentday = new Date();
  var currentdayHour = currentday.getHours();
  var totalHours =[];

  for(var i= currentdayHour; i<=currentdayHour+12;i++){
    totalHours.push(i)
  }

  var dailyHoursData= [];
  if(data){
    for(var j=0; j<data.length-36; j++){
        dailyHoursData.push(Math.round(data[j].temp))
    }
  }
    // console.log("dailyHoursData",dailyHoursData)
  const series = [
      {
        name: "temp",
        data: dailyHoursData
      }
    ];
    const options = {
      xaxis: {
        categories: totalHours
      },
      dataLabels:{enabled: false}
    };     
    return <
      Chart type="area" 
      series={series} 
      options={options}   
    />;
}
