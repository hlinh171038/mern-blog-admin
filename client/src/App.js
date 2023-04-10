import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Registry from './pages/Registry';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create-post' element={<CreatePost/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registry' element={<Registry/>}/>
    </Routes>
  );
}

export default App;
