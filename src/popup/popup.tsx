import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'fontsource-roboto';
import './popup.css';
import WeatherCard from '../WeatherCard';
import AddIcon from '@mui/icons-material/Add';
import { Box, InputBase, Paper, IconButton, Grid } from '@material-ui/core';
import { setStoredCities, getStoredCities } from '../utils/storage';

const Test = <img src="weather.png" alt="" />;

const App: React.FC<{}> = () => {
  const [cityName, setCityName] = useState<string>('');
  const [citesList, setCitesList] = useState<string[]>([]);
  useEffect(() => {
    getStoredCities().then((cities) => {
      setCitesList(cities);
    });
  }, []);

  const handleCityBtnClick = () => {
    if (cityName === '') {
      return;
    }

    const updatedCities = [...citesList, cityName];
    setStoredCities(updatedCities).then(() => {
      setCityName('');
      setCitesList(updatedCities);
    });
  };

  const handleDeleteCityBtn = (index: number) => {
    citesList.splice(index, 1);
    const updatedCities = [...citesList];
    setStoredCities(updatedCities).then(() => {
      setCitesList(updatedCities);
    });
  };

  return (
    <Box mx="8px" my="16px">
      <Grid container>
        <Grid item>
          <Paper>
            <Box px="15px" py="5px">
              <InputBase
                placeholder="city name"
                value={cityName}
                onChange={(event) => setCityName(event.target.value)}
              />
              <Box onClick={handleCityBtnClick}>
                <IconButton>
                  <AddIcon></AddIcon>
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {citesList.map((city, index) => {
        return (
          <WeatherCard
            city={city}
            key={index}
            onDelete={() => handleDeleteCityBtn(index)}
          ></WeatherCard>
        );
      })}
      <Box height="16px"></Box>
    </Box>
  );
};

const rootElement = document.createElement('div');
rootElement.setAttribute('id', 'root');
document.body.appendChild(rootElement);
const reactRoot = ReactDOM.createRoot(document.getElementById('root'));

reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
