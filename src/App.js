// import logo from './logo.svg';
import './App.css';
import GPT4Interaction from './GPT4Interaction';
import Log from './Log';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Till's AI Client</h1>
      </header>
      <main>
        <GPT4Interaction />
      </main>
      <Log />
    </div>
  );
}

export default App;

