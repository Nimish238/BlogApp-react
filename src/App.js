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
import UpdateProfile from './components/UpdateProfile';
import AllUsers from './components/AllUsers';
import AuthGuard from './Context/AuthGuard';


function App() {
  return (
    <Router>
      <ToastContainer/>
      <div >

        <Routes>

          <Route path="/login" element={<Login/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path='/addPost' element ={<AuthGuard><AddPost/></AuthGuard>}/>
          <Route path='/readMore/:postId' element ={<AuthGuard> <ReadMorePost/></AuthGuard>}/>
          <Route path='/categories/:categoryId' element={<AuthGuard><Category/></AuthGuard>}/>
          <Route path='/userPosts/:userId' element={<AuthGuard><UserPosts/></AuthGuard>}/>
          <Route path='/profileInfo/:userId' element={<AuthGuard> <ProfileInfo/></AuthGuard>}/>
          <Route path='/updateProfile/:userId' element={<AuthGuard><UpdateProfile/> </AuthGuard>}/>
          <Route path='/allUsers' element={<AuthGuard><AllUsers/> </AuthGuard>}/>
       
        </Routes>  
        
      </div>
    </Router>

  );
}

export default App;
