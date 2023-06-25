import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/home'
import BatchUpdate from './pages/batchUpdate'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/batchUpdate" element={<BatchUpdate />} />
      </Routes>
    </Router>
  );
}

export default App;
