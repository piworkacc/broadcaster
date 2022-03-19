import React, { useEffect, useState } from 'react'
import './styles.css'

export default function Chat({ socket }) {

  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {

    socket.on('message:send', (msg) => {
      setChatMessages((prev) => [...prev, msg]);
    })

    socket.on('message:get', (msg) => {
      setChatMessages((prev) => [...prev, msg]);
    })

    return () => {
      socket.disconnect();
    }
  }, [socket])


  const [inputValue, setInputValue] = useState('')

  const onClickHandler = () => {
    console.log('Отправка сообщения');
    // socket.emit('message:send', { message: inputValue, id: 123 })
    socket.emit('message:send', { message: inputValue })
  }

  return (
    <>
      <input type="text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
      <button type='button' onClick={onClickHandler}>Отправить</button>
      {chatMessages.map((element) => <div className='chatMessage'>{element.message}</div>)}
    </>
  )
}
