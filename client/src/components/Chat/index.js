import React, { useEffect, useState } from 'react'
// import './styles.css'

export default function Chat({ socket, stream_id = 1, user = 'Global' }) {

  const [chatMessages, setChatMessages] = useState([{}]);

  useEffect(() => {

    async function fetchData() {
      const response = await fetch(`/messages/${stream_id}`);
      const data = await response.json();
      setChatMessages((prev) => [...prev, ...data])
    }
    fetchData();

  }, [socket, stream_id, user])

  useEffect(() => {

    socket.on('message:send', (msg) => {
      console.log('Обработал message:send...', msg, user);
      setChatMessages((prev) => [...prev, { message: msg, user }]);
    })

    return () => {
      socket.disconnect();
    }
  }, [socket, user])


  const [inputValue, setInputValue] = useState('')

  const onClickHandler = () => {
    console.log('Отправка сообщения');
    socket.emit('message:send', { message: inputValue, room: stream_id })
  }

  return (
    <div className='ChatList'>
      <div className='chat-messages'>
        {chatMessages.map((element) => (
          <div key={element.id} className="containerMessage">
            <img src="/w3images/bandmember.jpg" alt="Avatar" />
            <p>{element.message}</p>
            <span className="time-right">{Date.now().toLocaleString}</span>
          </div>
        ))}
      </div>
      <input type="text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
      <button type='button' onClick={onClickHandler}>Отправить</button>
    </div>
  )
}
