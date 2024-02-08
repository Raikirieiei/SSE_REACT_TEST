import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TestSSE from './components/TestSSX';

function App() {
  return (
    <Router>
      <Routes>
        <Route
          element={<TestSSE />}
          path={'/'}
        />
      </Routes>
    </Router>
  );
}

export default App;
