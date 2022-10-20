import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from '../Header';
import Landing from '../Landing';
import Footer from '../Footer';
import Welcome from '../Welcome';
import Login from '../Login'
import Signup from '../SignUp'
import ErrorPage from '../ErrorPage';
import ForgetPassword from '../ForgetPassword';

import '../../App.css';

function App() {
  return (
    <Router className="App">
      <Header />
      
      <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
      </Routes>
          
      <Footer />
    </Router>
  );
}

export default App;
