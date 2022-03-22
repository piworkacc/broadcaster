import React, { useEffect, useState, useRef } from 'react'
import './styles.css';
import avatarHedgehog from '../../images/hedgehog.png'
import catAvatar from '../../images/cat.png'

export default function Chat({ socket, stream, user }) {

  const [chatMessages, setChatMessages] = useState([]);
  const bottomRef = useRef()

  useEffect(() => {

    async function fetchData() {
      const response = await fetch(`/messages/${stream}`);
      const data = await response.json();
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
      setChatMessages((prev) => [...prev, newMessage]);
    })

    socket.on('message:error', (msg) => {
      // const { newMessage, name, room, error } = msg;
      // setChatMessages((prev) => [...prev, newMessage]);
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
  // 
  return (
    <div className='chatList'>
      <div className='chat-messages'>
        {chatMessages.map((element) => (
          <div key={element.id} className={element.user_id === user.id ? "containerMessage message-right" : "containerMessage message-left"}>
            <div>
              <img src={element.user_id === user.id ? avatarHedgehog : catAvatar} alt="Avatar" />
              <span> {element.createdAt}</span>
              <span className='userName'>{element.userName || element.User?.name}</span>
            </div>
            <p>{element.message}</p>
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
