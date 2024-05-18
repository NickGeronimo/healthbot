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
            {"role": "user", "content": "speak as baymax from big hero 6."+ responding},
    ],
  })
}).then((data) => {
  return data.json();
}).then((data) => {
  setSentiment(data.choices[0].message.content)
});
    }

    return (

    <main className="App">
      <section>
      <div id=""> 
          {sentiment !== ""? 
        <h3>Baymax Says: {sentiment}</h3>
        :
        null  
        }
        </div>
      </section>
        <div>
          <textarea 
            onChange={(e) => setResponse(e.target.value)}
            placeholder='Hello How Can I Help You Today'
            cols={50}
            rows={10}
          />
        </div>
        <div>
          <button onClick={callAwanAPI}> button</button>
        </div> 

      </main>
    );
    }

export default App;
