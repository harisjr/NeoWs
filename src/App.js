import './App.css';
import Dashboard from './dashboard/Dashboard';
import Stars from './Stars/Stars';
import {
  Routes,
  Route
} from "react-router-dom";
import Asteroid from './asteroid/Asteroid';

function App() {
  return (
    <div className="App">
      <Stars/>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/details" element={<Asteroid/>}/>
      </Routes>

    </div>
  );
}

export default App;
