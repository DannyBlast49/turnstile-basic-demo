import logo from './logo.svg';
import './App.css';

function App() {
  return (
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
          <form method='POST' action={window.location.origin + '/submit-form'}>
            <div className="cf-turnstile" data-sitekey="0x4AAAAAAAQtaqkzb37bPwqt" data-theme="light"></div>
            <button type="submit">Search</button>
          </form>
        </a>
      </header>
    </div>
  );
}

export default App;
