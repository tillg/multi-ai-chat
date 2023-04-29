// import logo from './logo.svg';
import './App.css';
import GPT4Interaction from './GPT4Interaction';
import Log from './Log';
import robots from './robots.png';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <img src={robots} alt="Robots" className="App-logo" />{' '}
          Multi AI Chat
        </h1>
      </header>
      <main>
        <GPT4Interaction />
      </main>
      <Log />
    </div>
  );
}

export default App;

