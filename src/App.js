import React, { useState } from 'react';
import './App.css'
import Weather from './components/Weather';
import Prevision from './components/Prevision';
import Loading from './components/Loading';
import SearchBar from './components/SearchBar'; 
import MyHeader from './components/MyHeader';
import { Col, Container, Row } from 'react-bootstrap';
import TempGraphic from './components/TempGraphic';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [cityCoordinates, setCityCoordinates] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    
    <Container>
      <MyHeader/>
      <SearchBar
        setWeatherData={setWeatherData}
        setCityCoordinates={setCityCoordinates}
        setLoading={setLoading}
      />

      {loading && <Loading />}

      {weatherData && !loading && (
        <Row className="main">
          <Col className="Previsions">
            <Prevision cityCoordinates={cityCoordinates} />
          </Col>
          <Col className="MainWeather">
            <Weather weatherData={weatherData} />
          </Col>
        </Row>
      )}
      <hr />
      <TempGraphic cityCoordinates={cityCoordinates}/>
    </Container>
  );
}

export default App;
