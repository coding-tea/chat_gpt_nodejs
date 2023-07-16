import { useState, useEffect } from "react";
import './app.css';

function App() {
  
  const [value,setValue] = useState(null);
  const [message,setMessage] = useState(null);
  const [chat,setChat] = useState([]);

  const getMessages = async () => {
    const options = {
      method : "POST",
      headers:{
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({
        message : value
      }),
    };
    try{
      const responce = await fetch('http://localhost:4000/completions', options);
      const data = await responce.json();
      setMessage(data.choices[0].message);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    if(value && message)
      setChat([...chat, {role : 'user', content:value}, {role : message.role, content: message.content}]);
  }, [message]);

  return (
    <div className="app">
      <section class="main_section">
        <h1>chatGPT with nodejs api</h1>
        <ul class="chat">
        {
          chat.map(item => {
            return (
              <li className={item.role} > {item.content} </li>
            );
          })
        }
        </ul>
        <div class="call_to_action">
            <input type="text" value={value} onChange={e => setValue(e.target.value)} placeholder="send a message " />
            <button onClick={getMessages} >
              submit
            </button>
        </div>
      </section>
    </div>
  );
}

export default App;
