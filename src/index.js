import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import testSetup, { restore } from './deprecated-code/testing';
import App from './App';

testSetup();

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
