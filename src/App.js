import { useState, useEffect } from 'react';

function App() {
  const [value, setValue] = useState(null)
  const [message, setMessage] = useState(null)
  const [longMessage, setLongMessage] = useState(null)
  const [previousChats, setPreviousChats] = useState([])
  const [currentTitle, setCurrentTitle] = useState(null)

  const createNewChat = () => {
    setMessage(null)
    setLongMessage(null)
    setValue("")
    setCurrentTitle(null)
  }

  const handleClick = (uniqueTitle) => {
    setCurrentTitle(uniqueTitle)
    setMessage(null)
    setLongMessage(null)
    setValue("")
  }

  const getMessage = async () => {
    // Concise history request
    const optionsShort = {
      method: 'POST',
      body: JSON.stringify({
        message: `Provide me with a concise history of ${value} in 1-2 paragraphs`
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    // Longer history request. The '1000 words' is a rough estimate of the desired length of the response. They will often be shorter. 
    const optionsLong = {
      method: 'POST',
      body: JSON.stringify({
        message: `Provide me with a detailed history of ${value} in at least 1000 words.`
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      // Fetch short history
      const responseShort = await fetch('http://localhost:8000/completions', optionsShort)
      const dataShort = await responseShort.json()
      setMessage(dataShort.choices[0].message)

      // Fetch long history
      const responseLong = await fetch('http://localhost:8000/completions', optionsLong)
      const dataLong = await responseLong.json()
      setLongMessage(dataLong.choices[0].message)
    } catch(error) {
      console.error(error);
    }
  }

  useEffect(() => {
    console.log(currentTitle, value, message, longMessage)
    if (!currentTitle && value && message && longMessage) {
      setCurrentTitle(value)
    }
    if (currentTitle && value && message && longMessage) {
      setPreviousChats(prevChats => (
        [...prevChats, 
          {
            title: currentTitle, 
            role: "user", 
            content: value
          }, 
          {
            title: currentTitle,
            role: message.role,
            content: message.content
          },
          {
            title: currentTitle,
            role: longMessage.role,
            content: longMessage.content
          }
        ]
      ))
      setCurrentTitle(value)
    }
  }, [message, longMessage, currentTitle])

  console.log(previousChats);

  const currentChat = previousChats.filter(previousChat => previousChat.title === currentTitle)
  const uniqueTitles = Array.from(new Set(previousChats.map(previousChat => previousChat.title)))
  console.log(uniqueTitles);

  return (
    <div className="app">
      <section className="side-bar">
        <button onClick={createNewChat}>+ New Chat</button>
        <ul className="history">
          {uniqueTitles?.map((uniqueTitle, index) => <li key={index} onClick={() => handleClick(uniqueTitle)}>{uniqueTitle}</li>)}
        </ul>
        <nav>
          <p>Made by Hunter</p>
        </nav>
      </section>
      <section className="main">
        {!currentTitle && <h1>GPT Clone</h1>}
        <ul className="feed">
          {currentChat.map((chatMessage, index) => <li key={index}>
            <p className="role">{chatMessage.role}</p>
            <p>{chatMessage.content}</p>
          </li>)}
        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessage}>🢖</div>
            <p className="info">ChatGPT may produce inaccurate information about people, places, or facts. ChatGPT May 24 Version</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;

