import React, { useState, useEffect } from 'react';
import WeatherIcon from './WeatherIcon';
import { Button, Card } from 'react-bootstrap';
import Modal from './Modal';

const Weather = ({ weatherData }) => {
  const [currentWeather] = weatherData?.list || [];
  const Temperature = currentWeather ? (currentWeather.main.temp - 273.15).toFixed(2) : null;

  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const handleOutsideClick = (event) => {
      if (event.target.classList.contains('modal-overlay')) {
        handleClose();
      }
    };

    if (showModal) {
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('click', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showModal]);

  if (!currentWeather) {
    return null;
  }

  return (
    <div className="">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title style={{ fontSize: '30px', fontWeight: 'bold' }}>
            <WeatherIcon clouds={currentWeather.clouds.all} />
            {" " + weatherData.city.name} {Temperature} °C
          </Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Today, {new Date(currentWeather.dt * 1000).toLocaleDateString()}{' '}
          </Card.Subtitle>
          <Card.Text>
            <p>Humidity: {currentWeather.main.humidity}%</p>
            <p>
              Winds: {currentWeather.wind.speed} m/s, Direction: {currentWeather.wind.deg}°
            </p>
            <Button onClick={handleShow} className='show-Button'>More info</Button>
          </Card.Text>
        </Card.Body>
      </Card>

      {showModal && (
        <Modal
          show={showModal}
          handleClose={handleClose}
          title={weatherData.city.name}
          bodyContent={
            <>
              <p>Number of citizens: {weatherData.city.population}</p>
              <p>Sunrise sets: {new Date(weatherData.city.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p>Sunset sets: {new Date(weatherData.city.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              <p>Sea level: {currentWeather.main.sea_level}m</p>
              <p>Max temperature registered today: {(currentWeather.main.temp_max - 273.15).toFixed(2)} °C</p>
              <p>Min temperature registered today: {(currentWeather.main.temp_min - 273.15).toFixed(2)} °C</p>
              <p>The sky today looks {currentWeather.weather[0].main}</p>
            </>
          }
        />
      )}
    </div>
  );
};

export default Weather;
