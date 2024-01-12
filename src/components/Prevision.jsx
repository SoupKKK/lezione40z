import React, { useEffect, useState } from 'react';
import WeatherIcon from './WeatherIcon';
import { Button, Card, Modal } from 'react-bootstrap';

const MyKey = '9bce159514msh2f53ed4d2b7bd15p101dc9jsnce7e0458543f';

const Prevision = ({ cityCoordinates }) => {
  const [dailyData, setDailyData] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    const fetchPrevisionData = async () => {
      if (cityCoordinates) {
        try {
          const { lat, lon } = cityCoordinates;

          const url = `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${lat}/${lon}`;
          const options = {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': MyKey,
              'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com',
            },
          };

          const response = await fetch(url, options);

          if (response.ok) {
            const result = await response.json();
            setDailyData(result.list);
          } else {
            console.error('Errore nella risposta della nuova API per le previsioni');
          }
        } catch (error) {
          console.error('Errore durante il recupero delle previsioni:', error);
        }
      }
    };

    fetchPrevisionData();
  }, [cityCoordinates]);

  if (!dailyData || !Array.isArray(dailyData)) {
    return null;
  }


  const filteredData = dailyData.filter((day, index) => [5, 15, 25, 35].includes(index));

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handleClose = () => {
    setSelectedDay(null);
  };

  return (
    <div>
      <h2>Previsions for the next 4 days: </h2>
      <ul className='PrevisonDays'>
        {filteredData.map((day) => (
          <li key={day.dt}>
            <p>
              <WeatherIcon clouds={day.clouds.all} /> {(day.main.temp - 273.15).toFixed(2)} °C
            </p>
            <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
            <p>Humidity: {day.main.humidity}%</p>
            <Button onClick={() => handleDayClick(day)} className='show-Button'>More Info</Button>
          </li>
        ))}
      </ul>

      {selectedDay && (
        <Modal show={!!selectedDay} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Additional Information for {new Date(selectedDay.dt * 1000).toLocaleDateString()}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              
              <p>Max temperature registered in the selected date: {(selectedDay.main.temp_max - 273.15).toFixed(2)} °C</p>
              <p>Min temperature registered in the selected date: {(selectedDay.main.temp_min - 273.15).toFixed(2)} °C</p>
              <p>In the selected date the skye is: {selectedDay.weather[0].main}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Prevision;
