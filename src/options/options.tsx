import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './options.css';
import 'fontsource-roboto';
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  Button,
  Switch,
} from '@material-ui/core';
import {
  getStoredOptions,
  setStoredOptions,
  LocalStorageOptions,
} from '../utils/storage';

type formState = 'ready' | 'saving';

const App: React.FC<{}> = () => {
  const [options, setOptions] = useState<LocalStorageOptions | null>(null);
  const [formState, setFormState] = useState<formState>('ready');
  useEffect(() => {
    getStoredOptions().then((options) => {
      setOptions(options);
    });
  }, []);

  const handleHomeCityInput = (homeCity: string) => {
    const updatedOptions = {
      ...options,
      homeCity: homeCity,
    };
    setOptions(updatedOptions);
  };

  const handleSaveHomeCityBtn = () => {
    setFormState('saving');
    setStoredOptions(options).then(() => {
      setTimeout(() => {
        setFormState('ready');
      }, 500);
      console.log('homeCity updated');
    });
  };

  const handleHasOvelayBtn = (checked: boolean) => {
    setOptions({ ...options, hasAutoOverlay: checked });

    //   const swichOptions = !options.hasAutoOverlay;
    //   const updatedOptions = {
    //     ...options,
    //     hasAutoOverlay: swichOptions,
    //   };
    //   setStoredOptions(updatedOptions).then(() => {});
  };

  if (!options) {
    return null;
  }
  let isFormFieldDisabled = formState == 'ready' ? false : true;

  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column" spacing={4}>
            <Grid item>
              <Typography variant="h4">Weather Extention Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">
                Auto toggle overlay on webpage load
              </Typography>
              <Switch
                color="primary"
                checked={options.hasAutoOverlay}
                onChange={(event, checked) => handleHasOvelayBtn(checked)}
                disabled={isFormFieldDisabled}
              ></Switch>
              <Typography variant="body1">Home City</Typography>
              <TextField
                placeholder="Enter a home city"
                value={options.homeCity}
                disabled={isFormFieldDisabled}
                onChange={(event) => handleHomeCityInput(event.target.value)}
              ></TextField>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveHomeCityBtn}
                disabled={isFormFieldDisabled}
              >
                {formState == 'ready' ? 'save' : 'saving...'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
