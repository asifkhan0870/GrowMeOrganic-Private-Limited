
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormPage from './pages/FormPage';
import SecondPage from './pages/SecongPage';


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormPage></FormPage>} />
        <Route path="/second" element={<SecondPage></SecondPage>} />
      </Routes>
    </Router>
  );
};

export default App;
