import './App.css';
import AiInteraction from './AiInteraction';
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
        <AiInteraction />
      </main>

    </div>
  );
}

export default App;

