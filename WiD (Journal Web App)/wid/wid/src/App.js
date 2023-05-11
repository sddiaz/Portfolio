import './App.css';
import { Routes, Route } from 'react-router-dom'
import Welcome from './components/user/Welcome';
import ProtectedRoutes from './components/user/ProtectedRoutes';
import Main from './components/Main';
function App() {
  return (
    <div>
      <Routes>
          <Route path="/" element={<Welcome />}/>
          <Route element={<ProtectedRoutes />}>
              <Route path="/home" element={<Main />} />
          </Route>
      </Routes>
    </div>
  );
}

export default App;
