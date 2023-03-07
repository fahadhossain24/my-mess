import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/home/Home/Home';
import About from './pages/home/About/About'
import Contact from './pages/home/contact/Contact'
import Login from './pages/home/login/Login'
import Register from './pages/home/Register/Register'
import Header from './pages/Shired/Header/Header';
import NotFound from './pages/Shired/NotFound';
import CreateMess from './pages/create-mess/CreateMess';
import AddAsMember from './pages/Add-as-member/AddAsMember';

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
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/createMess' element={<CreateMess></CreateMess>}></Route>
        <Route path='/addAsMember' element={<AddAsMember></AddAsMember>}></Route>
        <Route path='*' element={<NotFound></NotFound>}></Route>
      </Routes>
    </div>
  );
}

export default App;
