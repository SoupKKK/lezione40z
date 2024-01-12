import React, { useState } from 'react';
import Loading from './Loading';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const MyKey = '9bce159514msh2f53ed4d2b7bd15p101dc9jsnce7e0458543f';

const SearchBar = ({ setWeatherData, setCityCoordinates }) => {
    const [cityName, setCityName] = useState('');
    const [loading, setLoading] = useState(false); 

  const handleSearch = async () => {
    try {
      setLoading(true);

      const geoResponse = await fetch(
        `https://open-weather13.p.rapidapi.com/city/${cityName}`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': MyKey,
            'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
          }
        }
      );

      if (geoResponse.ok) {
        const geoData = await geoResponse.json();
        const { lat, lon } = geoData.coord;

        const weatherResponse = await fetch(
          `https://open-weather13.p.rapidapi.com/city/fivedaysforcast/${lat}/${lon}`,
          {
            method: 'GET',
            headers: {
              'X-RapidAPI-Key': MyKey,
              'X-RapidAPI-Host': 'open-weather13.p.rapidapi.com'
            }
          }
        );

        if (weatherResponse.ok) {
          const weatherData = await weatherResponse.json();
          setWeatherData(weatherData);
          setCityCoordinates({ lat, lon });
        } else {
          console.error('Errore nella risposta della nuova API per il meteo');
        }
      } else {
        console.error('Errore nella risposta della nuova API per le coordinate');
      }
    } catch (error) {
      console.error('Errore durante la ricerca del meteo:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div>
      <InputGroup className="m-5">
        <Form.Control
          aria-label="Example text with button addon"
          aria-describedby="basic-addon1"
          type="text"
          placeholder="Inserisci il nome della città"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </InputGroup>

      {loading && <Loading />}
    </div>
  );
};

export default SearchBar;
