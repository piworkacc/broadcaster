
import './index.css'
import { v4 as uuidv4 } from 'uuid';

import InputMessage from './inputMessage';

// import MessageInput from './MessageInput/MessageInput'
// import MessageList from './MessageList/MessageList'

export default function Chat({ socketRef, messages }) {

  const sendMessage = (msg = 'Chat created') => {
    // добавляем в объект id пользователя при отправке на сервер
    socketRef.emit('message:add', {
      message: msg,
    })
    console.log('Рендер всего чата', messages);
  }

  return (
    <>
      <InputMessage sendMessage={sendMessage} />
      {messages.map((value, index) => <div key={uuidv4()} className='ant-list-item'>{value}</div>)}
    </>
  )
}
