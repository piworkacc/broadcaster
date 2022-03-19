import './App.css';
import { io } from 'socket.io-client';
import { Routes, Route } from 'react-router-dom'
import Main from "./components/Main/Main";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Logout from './components/Logout/Logout';
import Header from "./components/Header/Header.component";
import UserProfile from './components/UserProfile/UserProfile';
import Chat from './components/Chat';

const socket = io.connect('http://localhost:3002');

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route exact path="/logout" element={<Logout />}></Route>
      </Routes>

    </div>
  );
}

export default App;
