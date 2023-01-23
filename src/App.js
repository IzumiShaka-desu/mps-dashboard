import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import MpsPatternPage from './pages/MpsPatternPage';
import WpsPatternPage from './pages/WpsPatternPage';
import { BrowserRouter as Router, NavLink, Link, createBrowserRouter, Route, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          <h1>Hello World</h1>
          <Link to="about">About Us</Link>
        </div>
      ),
    },
    {
      path: "MPS-Pattern",
      element: (
        <div>
          <Navbar>
            <MpsPatternPage />
          </Navbar>
        </div>
      ),
    }, {
      path: "WPS-Pattern",
      element: (
        <div>
          <Navbar>
            <WpsPatternPage />
          </Navbar>
        </div>
      ),
    },
    {
      path: "about",
      element: <div>About</div>,
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
