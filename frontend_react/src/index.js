import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

// Following line has been deprecated in React 17
// ReactDOM.render(<App />, document.getElementById('root'));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);