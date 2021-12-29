import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Routes } from './routes';
import { GlobalStyle } from './styles/global';
import 'bootstrap/dist/css/bootstrap.css';

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
};

export default App;
