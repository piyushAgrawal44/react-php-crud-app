
import './App.css';
import Navbar from './components/Navbar';
import MyForm from './components/MyForm';
import List from './components/List';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return (
    <div className="App">
        <Navbar />
        <Router>
          
              <Routes>
                <Route path='/' element={<MyForm />} />
                
                <Route path='/list' element={<List  />} />
              </Routes>
         
        </Router>
       
        
    </div>
  );
}

export default App;
