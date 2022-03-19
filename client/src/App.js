import './App.css';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Logout from './components/Logout/Logout';
import Chat from './components/Chat';
import Header from './components/Header/Header.component';
// import UserProfile from './components/UserProfile/UserProfile';

import { useEffect, useState } from 'react';

import io from 'socket.io-client';
import { SERVER_URI } from './constants';

const socketRef = io(SERVER_URI);

function App() {
  const [message, setMessage] = useState([1284698123469812]);

  socketRef.on('message:add', (msg) => {
    console.log('Сообщение прочтиано', msg);
    setMessage([msg.message]);
  });

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/profile" element={<UserProfile />} /> */}
        <Route exact path="/logout" element={<Logout />}></Route>
      </Routes>
      <Chat socketRef={socketRef} messages={message} />
    </div>
  );
}

export default App;
