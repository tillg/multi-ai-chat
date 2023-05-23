import './App.css';
import React, { createContext, useState, useEffect } from "react";
import { getAvailableModels } from './OpenaiApi';
import AiInteraction from './AiInteraction';
import robots from './robots.png';

// Create the context
export const AppContext = createContext();
let OPENAI_API_KEY

const App = () => {
  // Set initial context state
  const [contextState, setContextState] = useState({
    param1: "Initial param1",
    param2: "Initial param2",
  });

  useEffect(() => {
    // Make sure we have a valid API key
    const url = window.location.href;
    const urlObj = new URL(url);
    const OPENAI_API_KEY_fromUrl = urlObj.searchParams.get("OPENAI_API_KEY");
    const OPENAI_API_KEY_fromEnv = process.env.REACT_APP_OPENAI_API_KEY;
    if (OPENAI_API_KEY_fromEnv) {
      console.log("Took OPENAI_API_KEY from environment variable.")
      OPENAI_API_KEY = OPENAI_API_KEY_fromEnv
    } else if (OPENAI_API_KEY_fromUrl) {
      console.log("Took OPENAI_API_KEY from URL.")
      OPENAI_API_KEY = OPENAI_API_KEY_fromUrl
    } else if (!OPENAI_API_KEY) {
      OPENAI_API_KEY = prompt("Please enter your OpenAI API key:", "sk-<your key here>");
    }
    console.log(`Using OpenAI API key: ${OPENAI_API_KEY}`)
    if (!OPENAI_API_KEY) {
      const error = "Error: Cannot use OpenAi without API Key."
      console.error(error)
      alert(error)
      throw error
    }

    // Get the list of available models
    let availableModels = []
    try {
      availableModels = getAvailableModels();
    } catch (error) {
      console.error(`Error fetching available models:  ${error}`);
      alert(error)
      throw error
    }

    setContextState({ OPENAI_API_KEY, availableModels });
  }, []);

  return (
    <AppContext.Provider value={[contextState, setContextState]}>
      <div className="App">
        <header className="App-header">
          <h1>
            <img src={robots} alt="Robots" className="App-logo" />{' '}
            Double AI Chat
          </h1>
        </header>
        <main>
          <AiInteraction />
        </main>
        Version `{process.env.APP_VERSION}` (0.1.6)
      </div>
    </AppContext.Provider>

  );
}

export default App;

