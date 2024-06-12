import './App.css';
import WeatherApp from './components/WeatherApp';
import Geolocation from './components/Geolocation';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <WeatherApp />
      <Geolocation />
    </div>
  );
}

export default App;
