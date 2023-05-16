import logo from './logo.svg';
import './App.css';
import {HttpProvider} from 'swish-react-library'

function App() {
  return (
    <HttpProvider>
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
    </HttpProvider>
  );
}

export default App;
