import './App.css';
import {Routes, Route} from 'react-router-dom'
import Main from "./components/Main/Main";
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Logout from './components/Logout/Logout';




function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element ={<Main/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route exact path="/logout" element={<Logout />}></Route>
      </Routes>

    </div>
  );
}

export default App;
