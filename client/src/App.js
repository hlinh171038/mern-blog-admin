import logo from './logo.svg';
import './App.css';
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home';
import CreatePost from './pages/CreatePost';
import Login from './pages/Login';
import Registry from './pages/Registry';
import Detail from './pages/Detail';
import Edit from './pages/Edit';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/create-post' element={<CreatePost/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/registry' element={<Registry/>}/>
      <Route path='/post/:id' element={<Detail/>}/>
      <Route path='/edit/:id' element={<Edit/>}/>
    </Routes>
  );
}

export default App;
