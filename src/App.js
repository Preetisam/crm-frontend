
import './App.css';
import Admin from './pages/Admin';
import Enginner from './pages/Enginner';
import Login from './pages/Login'
import { BrowserRouter as Router , Routes, Route} from 'react-router-dom';

import ErrorPage from './pages/ErrorPage';
import Coustomer from './pages/Coustmer';
import "@coreui/coreui/dist/css/coreui.min.css";
import "@coreui/coreui/dist/js/coreui.min.js";


function App() {
  return (
    <Router>
  
    <Routes>
      <Route path="/" element={<Login/>} />
      {localStorage.getItem("userTypes") === "CUSTOMER" && <Route path="/customer" element={<Coustomer/>} />}
      <Route path="/Enginner" element={<Enginner />}/>
   
      <Route path="/admin" element={<Admin/>} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
   
  </Router>
    
  );
}

export default App;