import './App.css';
import AiInteractionDouble from './AiInteractionDouble';
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
        <AiInteractionDouble />
      </main>
      <Log />
    </div>
  );
}

export default App;

