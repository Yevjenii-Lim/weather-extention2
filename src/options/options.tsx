import React from 'react';
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
} from '@material-ui/core';

const App: React.FC<{}> = () => {
  return (
    <Box mx="10%" my="2%">
      <Card>
        <CardContent>
          <Grid container direction="column">
            <Grid item>
              <Typography variant="h4">Weather Extention Options</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">Home City</Typography>
              <TextField placeholder="Enter a home city"></TextField>
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
