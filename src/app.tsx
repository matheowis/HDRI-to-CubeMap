import * as React from 'react';
import {createRoot} from 'react-dom/client';
import MainPage from './pages/MainPage';

const container = document.createElement('div');
document.body.append(container);

const root = createRoot(container);

root.render(<MainPage />)