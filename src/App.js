import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home/Home';
import About from './pages/home/About/About'
import Contact from './pages/home/contact/Contact'
import Login from './pages/home/login/Login'
import Header from './pages/Shired/Header/Header';
import NotFound from './pages/Shired/NotFound';

function App() {
  return (
    <div>
      <Header></Header>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/contact' element={<Contact></Contact>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
