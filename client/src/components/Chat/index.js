import React, { useEffect, useState } from 'react'
import './styles.css'

export default function Chat({ socket, stream_id = 1, user = 1 }) {

  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {

    async function fetchData() {
      const response = await fetch(`/messages/${stream_id}`);
      const data = await response.json();
      console.log(data);
      setChatMessages((prev) => [...prev, ...data])
    }
    fetchData();

  }, [socket, stream_id, user])

  useEffect(() => {

    socket.on('message:get', (msg) => {
      const { chatMessage, room, user, error } = msg;
      console.log('Обработал message:get...', msg, chatMessage);
      setChatMessages((prev) => [...prev, chatMessage]);
    })

    return () => {
      socket.disconnect();
    }
  }, [socket, user])


  const [inputValue, setInputValue] = useState('')

  const onClickHandler = () => {
    console.log('Отправка сообщения');
    socket.emit('message:send', { message: inputValue, room: stream_id, user })
  }

  return (
    <div className='ChatList'>
      {chatMessages.map((element) => (
        <div key={element.id.toString()} className="containerMessage">
          <p>{element.message}</p>
          <span className="time-right">{Date.now().toLocaleString}</span>
        </div>
      ))}
      <input type="text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
      <button type='button' onClick={onClickHandler}>Отправить</button>
    </div>

  )
}
