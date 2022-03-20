import './App.css';
import { io } from 'socket.io-client';
import { Routes, Route } from 'react-router-dom';
import Main from './components/Main/Main';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Logout from './components/Logout/Logout';
import Header from './components/Header/Header.component';
import UserProfile from './components/UserProfile/UserProfile';
import Chat from './components/Chat';
import StreamPage from './components/StreamPage/StreamPage.component';
import VideoPage from './components/VideoPage/VideoPage.component';

const socket = io.connect('/');


function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<UserProfile />} />
        <Route exact path='/chat' element={<Chat socket={socket} />}></Route>
        <Route exact path='/logout' element={<Logout />} />
        <Route
          path='/streams/:streamId'
          element={<StreamPage socket={socket} />}
        />
        <Route path='videos/:videoId' element={<VideoPage />} />
      </Routes>
    </div>
  );
}

export default App;
