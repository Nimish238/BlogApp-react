import { Route, BrowserRouter as  Router, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import Home from './components/Home';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AddPost from './components/AddPost';
import ReadMorePost from './components/ReadMorePost';
import Category from './components/Category';
import UserPosts from './components/UserPosts';
import ProfileInfo from './components/ProfileInfo';

function App() {
  return (
    <Router>
      <ToastContainer/>
      <div >

        <Routes>

          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path='/addPost' element ={<AddPost/>}/>
          <Route path='/readMore/:postId' element ={<ReadMorePost/>}/>
          <Route path='/categories/:categoryId' element={<Category/>}/>
          <Route path='/userPosts/:userId' element={<UserPosts/>}/>
          <Route path='/profileInfo/:userId' element={<ProfileInfo/>}/>

        </Routes>  
        
      </div>
    </Router>

  );
}

export default App;
