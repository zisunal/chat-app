import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App';

const theme = createTheme({
	palette: {
		primary: {
			main: process.env.REACT_APP_PRIMARY_COLOR,
		},
		secondary: {
			main: process.env.REACT_APP_ACCENT_COLOR,
		},
	},
});
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ThemeProvider theme={theme}>
				<App />
			</ThemeProvider>
		</Provider>
	</React.StrictMode>
);