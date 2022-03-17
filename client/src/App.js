import './App.css';
import {Routes, Route} from 'react-router-dom'
import Main from "./components/Main/Main";
import SignInForm from './components/SignInForm/SignInForm';
import SignUpForm from './components/SignUpForm/SignUpForm';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element ={<Main/>}/>
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/signup" element={<SignUpForm />} />
      </Routes>

    </div>
  );
}

export default App;
