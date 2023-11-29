import React from 'react';
import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState();
  const [prompt, setPrompt] = useState('what do you want to talk about?...');
  const [file, setFile] = useState()


  const fileUploadHandler = (event) => {
    event.preventDefault()
    const url = "http://localhost:5000/fileUpload"
    const formData = new FormData()
    formData.append("pdf", file)
    //formData.append("filename", file.name)
    fetch(url, {
      "method": "POST",
      "body": formData
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
    }).catch(error => console.log(error))
  }

  const onFileChange = (event) => {
    setFile(event.target.files[0])
  }

  const formEventHandler = (event) => {
    event.preventDefault();
    console.log("this is prompt", prompt)
    fetch("http://localhost:5000/ask", {
      method: "POST",
      "mode": "cors",
      headers: {
        "Content-Type": "application/json"
      },
      "body": JSON.stringify({
        "prompt": prompt
      })

    }).then(response => response.json())
      .then(data => {
        setData(data.message.content)
      })
      .catch(error => console.error(error))
  }

  return (
    <div className="App">
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>ChatGPT integration Assignment</h2>
      </div>


      <p>{data}</p>

      <form onSubmit={formEventHandler}>
        <textarea type="text" placeholder={prompt} onChange={event => setPrompt(event.target.value)}></textarea>
        <button>Submit</button>
      </form>
      <br></br>
      <form onSubmit={fileUploadHandler}>
        <input type="file" onChange={onFileChange} name="pdf"></input>
        <button>Upload</button>
      </form>
    </div>
  );
}


export default App;
