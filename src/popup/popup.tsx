import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'fontsource-roboto';
import './popup.css';
import WeatherCard from '../WeatherCard';
import AddIcon from '@mui/icons-material/Add';
import { Box, InputBase, Paper, IconButton, Grid } from '@material-ui/core';
import {
  setStoredCities,
  getStoredCities,
  setStoredOptions,
  getStoredOptions,
  LocalStorageOptions,
} from '../utils/storage';

const App: React.FC<{}> = () => {
  const [cityName, setCityName] = useState<string>('');
  const [citesList, setCitesList] = useState<string[]>([]);
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  useEffect(() => {
    getStoredCities().then((cities) => {
      setCitesList(cities);
    });
    getStoredOptions().then((options) => {
      setOptions(options);
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

  const handleTempScaleBtn = () => {
    const updateOptionsObj: LocalStorageOptions = {
      ...options,
      tempScale: options.tempScale === 'metric' ? 'imperial' : 'metric',
    };

    setStoredOptions(updateOptionsObj).then(() => {
      setOptions(updateOptionsObj);
    });
  };
  if (!options) {
    return null;
  }
  return (
    <Box mx="8px" my="16px">
      <Grid container justifyContent="space-evenly">
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
        <Grid item>
          <Paper>
            <IconButton onClick={handleTempScaleBtn}>
              {options.tempScale === 'metric' ? '\u2103' : '\u2109'}
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
      {options.homeCity != '' && (
        <WeatherCard
          city={options.homeCity}
          tempScale={options.tempScale}
        ></WeatherCard>
      )}
      {citesList.map((city, index) => {
        return (
          <WeatherCard
            city={city}
            key={index}
            tempScale={options.tempScale}
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
