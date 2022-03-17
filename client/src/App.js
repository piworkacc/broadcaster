import './App.css';
import {Routes, Route} from 'react-router-dom'
import Main from "./components/Main/Main";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element ={<Main/>}/>
      </Routes>

    </div>
  );
}

export default App;
