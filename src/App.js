import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendRequest = async () => {
    try {
      setLoading(true);
      const result = await axios.get(`http://localhost:8080/api/v1/chat?prompt=${prompt}`);
      setResponse(result.data);
    } catch (error) {
      console.error('Error during chat:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="PromptContainer">
        <label htmlFor="prompt" className="PromptLabel">
          Ingredients
        </label>
        <div className="InputButtonContainer">
          <input
            type="text"
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="PromptInput"
            placeholder="Enter ingredients..."
          />
          <button
            onClick={sendRequest}
            className="PromptButton"
            disabled={loading || !prompt.trim()}
          >
            {loading ? 'Loading...' : 'Get Recipe'}
          </button>
        </div>
      </div>
      {loading && (
        <div className="LoadingContainer">
          <p>Loading...</p>
        </div>
      )}
      {response && (
        <div className="RecipeContainer">
          <h2 className="RecipeHeader">Recipe</h2>
          <p className="RecipeText">{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
