import logo from './logo.svg';
import './App.css';

function App() {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = event.target.elements[0].value; // get the value of the first form element
    const response = await fetch('https://turnstile-basic-demo.vercel.app/api/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'cf-turnstile-response': token }), // send a JSON object
    });
    const data = await response.json();

    console.log(data);
  };

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
        </a>
        <form onSubmit={handleSubmit}>
          <div className="cf-turnstile" data-sitekey="0x4AAAAAAAQtaqkzb37bPwqt" data-theme="light"></div>
          <button type="submit">Search</button>
        </form>
      </header>
    </div>
  );
}

export default App;
