// TempGraphic.jsx
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const MyKey = '9bce159514msh2f53ed4d2b7bd15p101dc9jsnce7e0458543f';

const TempGraphic = ({ cityCoordinates }) => {
    const [temperatureData, setTemperatureData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            if (cityCoordinates) {
                const { lat, lon } = cityCoordinates;

                const url = `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${lat}/${lon}`;
                const options = {
                    method: 'GET',
                    headers: {
                        'X-RapidAPI-Key': MyKey,
                        'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
                    }
                };

                try {
                    const response = await fetch(url, options);
                    const result = await response.json();

                    const temperatures = result.list.map(day => (day.main.temp - 273.15).toFixed(2));
                    setTemperatureData(temperatures);
                } catch (error) {
                    console.error('Errore durante il recupero dei dati di temperatura:', error);
                }
            }
        };

        fetchData();
    }, [cityCoordinates]);

    const data = {
        labels: Array.from({ length: temperatureData.length/2 }, (_, i) => `Giorno ${i + 1}`),
        datasets: [
            {
                label: 'Temperature',
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 1,
                pointRadius: 3,
                data: temperatureData,
            },
        ],
    };

    if(cityCoordinates){
    return (
        <div style={{ maxHeight: "500px" }}>
            <h2>Temperature graph starting from today to the next 20 days: </h2>
            <Line
                data={data}
                width={200}  
                height={150} 
            />
        </div>
    );
    }
};

export default TempGraphic;
