import React, { useEffect, useState, useRef } from 'react'
import './styles.css';
import { UserOutlined } from '@ant-design/icons'

export default function Chat({ socket, stream, user }) {

  const [chatMessages, setChatMessages] = useState([]);
  const bottomRef = useRef()

  useEffect(() => {

    async function fetchData() {
      const response = await fetch(`/messages/${stream}`);
      const data = await response.json();
      console.log(data);
      setChatMessages((prev) => [...prev, ...data])
    }

    fetchData();

    if (socket.disconnected) {
      socket.connect('/');
    }

  }, [socket, stream, user])

  useEffect(() => {
    bottomRef.current.scrollIntoView({
      behavior: 'smooth'
    })
  }, [chatMessages])

  useEffect(() => {

    socket.on('message:get', (msg) => {
      const { newMessage, name, room, error } = msg;
      console.log('Обработал message:get...', msg, newMessage);
      setChatMessages((prev) => [...prev, newMessage]);
    })

    return () => {
      socket.disconnect();
    }
  }, [socket, user])


  const [inputValue, setInputValue] = useState('')

  const onClickHandler = () => {
    socket.emit('message:send', { message: inputValue, room: stream, user })
    setInputValue('')
  }

  const submitHandler = (e) => {
    e.preventDefault();
    socket.emit('message:send', { message: inputValue, room: stream, user })
    setInputValue('')
  }

  return (
    <div className='ChatList'>
      <div className='chat-messages'>
        {chatMessages.map((element) => (
          <div key={element.id} className="containerMessage">
            <UserOutlined />
            <p>{element.userName || element.User?.name} {element.message} {element.createdAt.toLocaleString('en-US')}</p>
            <span className="time-right">{Date.now().toLocaleString}</span>
          </div>
        ))}
        <p ref={bottomRef}></p>
      </div>
      <form className='chat__form' onSubmit={(e) => submitHandler(e)}>
        <input className='chat__input' placeholder='Введите сообщение...' type="text" onChange={(e) => setInputValue(e.target.value)} value={inputValue} />
        <button className='chat__sendMsgButton' type='button' onClick={onClickHandler}>Отправить</button>
      </form>
    </div>
  )
}
