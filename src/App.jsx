import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import HomePage from './components/pages/HomePage';
import Price from './components/pages/Price';
import Profile_page from './components/pages/Profile_page';
import Application_page from './components/pages/Application_page';
import ForgetPage from './components/pages/ForgetPage';

function App() {
  return (
    <Router>
        <Routes>
             <Route path='/login' element={<Login/>} />
             <Route path='/Signup' element={<Signup/>} />
             <Route path='/' element={<HomePage/>} />
             <Route path='/Pricing' element={<Price/>} />
             <Route path='/Profile' element={<Profile_page/>} />
             <Route path='/Application' element={<Application_page/>} />
             <Route path='/ForgetPage' element={<ForgetPage/>} />
        </Routes>
     </Router>
  )
}

export default App
