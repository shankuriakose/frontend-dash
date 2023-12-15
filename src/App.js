import "./App.css"
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { checkAuth,getUser } from './features/user';
import DashboardPage from './profile_page/DashboardPage1';
import HomePage from './components/homepage/HomePage';
import LoginPage from './containers/LoginPage';
import RegisterPage from './containers/RegisterPage';
import PrivateRoutes from './privaterouting/PrivateRoutes'
import Create from './profile_page/Create'
import Edit from './profile_page/Edit'
import Delete from './profile_page/Delete'
import Profile from './profile_page/Profile'


const App = () => {
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkAuth());
  },[])



  return(
    <Router>
      <Routes>
        <Route element={<PrivateRoutes />} >
          <Route path="/create" element={<Create />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/delete/:id" element={<Delete />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />


      </Routes>
    </Router>
  );
};

export default App;