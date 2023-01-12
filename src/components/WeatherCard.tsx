import React, { useEffect, useState } from 'react';
import {
  fetchOpenWeatherData,
  OpenWeatherData,
  OpenWeatherTempScale,
} from '../utils/api';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';

const WeatherCardContainer: React.FC<{
  children: React.ReactNode;
  onDelete?: () => void;
}> = ({ children, onDelete }) => {
  return (
    <Box mx={'4px'} my={'16px'}>
      <Card>
        <CardContent>{children}</CardContent>
        <CardActions>
          {onDelete && (
            <Button color="secondary" onClick={onDelete}>
              Delete
            </Button>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

type WeatherCardState = 'loading' | 'error' | 'ready';

const WeatherCard: React.FC<{
  city: string;
  onDelete?: () => void;
  tempScale: OpenWeatherTempScale;
}> = ({ city, tempScale, onDelete }) => {
  const [weatherData, setWeatherData] = useState<OpenWeatherData | null>(null);
  const [cardState, setCardState] = useState<WeatherCardState>('loading');
  useEffect(() => {
    fetchOpenWeatherData(city, tempScale)
      .then((data) => {
        setWeatherData(data);
        setCardState('ready');
      })
      .catch((err) => setCardState('error'));
  }, [city, tempScale]);
  if (cardState == 'error' || cardState == 'loading') {
    return (
      <WeatherCardContainer onDelete={onDelete}>
        <Typography>
          {cardState == 'loading' ? 'Loading...' : 'Error'}
        </Typography>
      </WeatherCardContainer>
    );
  }
  return (
    <WeatherCardContainer onDelete={onDelete}>
      <Typography variant="h5">{weatherData.name}</Typography>
      <Typography variant="body1">
        {Math.round(weatherData.main.temp)}
      </Typography>
      <Typography variant="body1">
        Feels like: {Math.round(weatherData.main.feels_like)}
      </Typography>
    </WeatherCardContainer>
  );
};

export default WeatherCard;