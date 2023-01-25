import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import MpsPatternPage from './pages/MpsPatternPage';
import WpsPatternPage from './pages/WpsPatternPage';
import WoPatternPage from './pages/WoPatternPage';
import DetailWo from './pages/DetailWo';
import { BrowserRouter as Router, NavLink, Link, createBrowserRouter, Route, RouterProvider } from 'react-router-dom';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <div>
          <Navbar />
          {/* <h1>Hello World</h1>
          <Link to="about">About Us</Link> */}
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
    }, {
      path: "WO-Pattern",
      element: (
        <div>
          <Navbar>
            <WoPatternPage />
          </Navbar>
        </div>
      ),
      children: [

      ]
    },
    {
      path: "/WO-Pattern/details",
      // loader: ({ params }) => {
      // params.line; // abc
      // params.date; // 3
      // params.type; // 3
      // },
      // action: ({ params }) => {
      // params.line; // abc
      // params.date; // 3
      // params.type; // 3
      // },
      element: (
        <div>
          <Navbar>
            <DetailWo />
            {/* <h1>Detail</h1> */}
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
