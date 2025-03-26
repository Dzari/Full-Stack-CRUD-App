import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CssBaseline, Container } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CssBaseline />
    <Container>
      <App />
    </Container>
  </React.StrictMode>
);
