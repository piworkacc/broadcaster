import React, { useEffect, useState } from 'react'
import './styles.css';
import { UserOutlined } from '@ant-design/icons'

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
    socket.emit('message:send', { message: inputValue, room: stream_id })
    setInputValue('')
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Отправка сообщения');
    socket.emit('message:send', { message: inputValue, room: stream_id })
    setInputValue('')
  }

  return (
    <div className='ChatList'>
      <div className='chat-messages'>
        {chatMessages.map((element) => (
          <div key={element.id} className="containerMessage">
            <UserOutlined />
            <p>{element.message}</p>
            <span className="time-right">{Date.now().toLocaleString}</span>
          </div>
        ))}
      </div>
      <form className='chat__form' onSubmit={(e) => submitHandler(e)}>
        <input className='chat__input' placeholder='Введите сообщение...' type="text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
        <button className='chat__sendMsgButton' type='button' onClick={onClickHandler}>Отправить</button>
      </form>
    </div>
  )
}
