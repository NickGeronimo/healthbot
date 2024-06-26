import logo from './logo.svg';
import React, { useState } from "react";
import './App.css';
const API_KEY = process.env.REACT_APP_API_KEY;

function App() {
    const [responding, setResponse] = useState("");
    const [answer, setSentiment] = useState("");

    async function callAwanAPI(){
      console.log("calling")
      await fetch("https://api.awanllm.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": API_KEY,
        },
        body: JSON.stringify({
          "model": "Meta-Llama-3-8B-Instruct",
          "messages": [
            {"role": "user", "content": responding +"respond with less than 4 sentences"},
    ],
  })
}).then((data) => {
  return data.json();
}).then((data) => {
  setSentiment(data.choices[0].message.content)
});
    }

  function Push(){
    console.log(document.getElementById("response-container").innerHTML)
    callAwanAPI()
  }

    return (

    <main className="App">
      <section>
      <div id="response-container"> 
          {answer !== ""? 
        <span>{answer}</span>
        :
        null  
        }
        </div>
      </section>
      <section id="inputarea">
        <div>
          <textarea
            onChange={(e) => setResponse(e.target.value)}
            placeholder='Hello How Can I Help You Today?'
          />
        </div>
        <div>
          <button onClick={Push}> Submit</button>
        </div> 
      </section>
      <section id="previousAnswers">
      </section>  
      </main>
    );
    }

export default App;
