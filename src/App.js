import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';

const API_KEY = process.env.REACT_APP_API_KEY;
console.log(process.env)

function App() {
    const [responding, setResponse] = useState("");
    const [sentiment, setSentiment] = useState("");

    async function callAwanAPI(){
      await fetch("https://api.awanllm.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": API_KEY,
        },
        body: JSON.stringify({
          "model": "Meta-Llama-3-8B-Instruct",
          "messages": [
            {"role": "user", "content": responding},
    ],
  })
}).then((data) => {
  return data.json();
}).then((data) => {
  setSentiment(data.choices[0].message.content)
});
    }

    return (
      <div className="App">
        <div>
          <textarea 
            onChange={(e) => setResponse(e.target.value)}
            placeholder='ask question'
            cols={50}
            rows={10}
          />
        </div>
        <div>
          <button onClick={callAwanAPI}> button</button>
          {sentiment !== ""? 
        <h3>This Is: {sentiment}</h3>
        :
        null  
        }
        </div>
      </div>
    );
    }

export default App;
