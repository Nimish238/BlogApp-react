import { Route, BrowserRouter as  Router, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Home from './components/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AddPost from './components/AddPost';

function App() {
  return (
    <Router>
      <ToastContainer/>
      <div >

        <Routes>

          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path='/addPost' element ={<AddPost/>}/>

        </Routes>
        
      </div>
    </Router>

  );
}

export default App;
