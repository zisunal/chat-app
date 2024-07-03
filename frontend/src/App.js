import TopBarProgress from "react-topbar-progress-indicator";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Auth from "./screens/Auth";

TopBarProgress.config({
	barColors: {
	  	"0": process.env.REACT_APP_PRIMARY_COLOR,
	  	"1.0": process.env.REACT_APP_ACCENT_COLOR
	},
	shadowBlur: 5
});

function App() {
	const settings = useSelector(state => state.settings)
	const [loading, setLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(null);

	useEffect(() => {
		if (settings.theme == 'dark') {
			import('./css/dark.css')
		} else {
			import('./css/light.css')
		}
		if (settings.token != null) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
		setLoading(false);
	}, []);

	if (loading) {
		return (
			<div className="App">
				<TopBarProgress />
			</div>
		);
	}
	
	if (loggedIn) {
		return (
			<div className="App">
				<header className="App-header">
					<h1>Welcome to the Dashboard</h1>
				</header>
			</div>
		);
	
	} else {
		return (
			<div className="App">
				<Auth />
			</div>
		);
	}
}

export default App;
