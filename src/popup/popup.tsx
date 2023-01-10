import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import 'fontsource-roboto';
import './popup.css';
import WeatherCard from '../WeatherCard';
import AddIcon from '@mui/icons-material/Add';
import { Box, InputBase, Paper, IconButton, Grid } from '@material-ui/core';

const Test = <img src="weather.png" alt="" />;

type InputBaseProps = { children: React.ReactNode };

const App: React.FC<{}> = () => {
  const [cityName, setCityName] = useState<string>('');
  const [citesList, setCitesList] = useState<string[]>(['Toronto', 'Kherson']);

  const handleCityBtnClick = () => {
    if (cityName === '') {
      return;
    }
    setCitesList([...citesList, cityName]);
    setCityName('');
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
              <div onClick={handleCityBtnClick}>
                <IconButton>
                  <AddIcon></AddIcon>
                </IconButton>
              </div>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {citesList.map((city, index) => {
        return <WeatherCard city={city} key={index}></WeatherCard>;
      })}
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
