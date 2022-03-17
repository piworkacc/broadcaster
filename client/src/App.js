import './App.css';
import {Routes, Route} from 'react-router-dom'
import Main from "./components/Main/Main";
import Header from "./components/Header/Header.component";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route index element ={<Main/>}/>
      </Routes>

    </div>
  );
}

export default App;
