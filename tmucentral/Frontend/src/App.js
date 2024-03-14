import logo from './logo.svg';
import './App.css';

import NavBar from './components/NavBar';
import Login from './components/Login';


function App() {
  return (
    <div className="App">
      <Login/>
      <NavBar /> 
    </div>
  );
}

export default App;
