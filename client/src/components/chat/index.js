import React, { useEffect, useState } from 'react'
import './styles.css'

export default function Chat({ socket, stream_id = 1 }) {

  console.log('Создана комната', stream_id);

  const [chatMessages, setChatMessages] = useState([{}]);

  useEffect(() => {

    async function fetchData() {
      const response = await fetch(`/messages/${stream_id}`);
      const data = await response.json();
      setChatMessages((prev) => [...prev, ...data])
    }
    fetchData();

  }, [])

  useEffect(() => {

    socket.on('message:send', (msg) => {
      // socket.join(stream_id);
      console.log('Обработал message:send...', msg);
      setChatMessages((prev) => [...prev, { message: msg }]);
    })

    return () => {
      socket.disconnect();
    }
  }, [socket])


  const [inputValue, setInputValue] = useState('')

  const onClickHandler = () => {
    console.log('Отправка сообщения');
    socket.emit('message:send', { message: inputValue, room: stream_id })
  }

  return (
    <>
      <input type="text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
      <button type='button' onClick={onClickHandler}>Отправить</button>
      {chatMessages.map((element) => <div key={element?.id} className='chatMessage'>{element.message}</div>)}
    </>
  )
}
