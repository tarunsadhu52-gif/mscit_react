import './App.css';
import Login from './component/Login';
import UserData from './component/Userdata';
import AddUser from './component/AddUser';
import EditUser from './component/EditUser';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthRoute from './AuthRounte.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user-data" element={<AuthRoute><UserData /></AuthRoute>} />
        <Route path="/add-user" element={<AuthRoute><AddUser /></AuthRoute>} />
        <Route path="/edit-user/:id" element={<AuthRoute><EditUser /></AuthRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;