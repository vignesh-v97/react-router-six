import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router, Route, Routes, Navigate, Link, Outlet, useParams, NavLink, useNavigate, useLocation} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/myapps" element={<Navigate replace to="/learn" />}/>
      <Route path="/learn" element={<Learn/>}>
        <Route path="course" element={<Courses/>}>
          <Route path=":courseid" element={<CourseId/>}/>
        </Route>
        <Route path="bundle" element={<Bundles/>}/>
      </Route>
      <Route path="/dashboard" element={<Dashboard/>}/>
    </Routes>
  </Router>,
  document.getElementById('root')
);

function Home() {
  return (
    <div>
      <h1>Home route</h1>
    </div>
  )
}

function Learn() {
  return (
    <div>
      <h1>Learn</h1>
      <h4>All courses are listed here</h4>
      <Link className="btn btn-success m-2" to="/learn/course">Courses</Link>
      <Link className="btn btn-primary m-2" to="/learn/bundle">Bundle</Link>
      <Outlet/>
    </div>
  )
}

function Courses() {
  const courseList = ["React", "Angular", "Vue", "Nodejs"];
  const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)];
  return (
    <div>
      <h1>Course List</h1>
      <h4>Course Card</h4>

      <p>More Test</p>
      <NavLink style={({isActive}) => {
        return {
          backgroundColor: isActive ? "darkolivegreen" : "yellow"
        }
      }} className="m-2 btn btn-light" to={`/learn/course/${randomCourseName}`}>{randomCourseName}</NavLink>
      <NavLink className="m-2 btn btn-success" to={`/learn/course/tests`}>Tests</NavLink>

      <Outlet/>
    </div>
  )
}

function Bundles() {
  return (
    <div>
      <h1>Bundle List</h1>
      <h4>Bundle Card</h4>
    </div>
  )
}

function CourseId() {
  const navigate = useNavigate();
  const {courseid} = useParams();
  return (
    <div>
      <h1>URL Params is : {courseid}</h1>
      <button
        onClick={() => {
          navigate("/dashboard", {state: "300"})
        }}
      className="btn btn-warning">Price</button>
      <Link to="/dashboard" state={"HTML"}>Test Link</Link>
    </div>
  )
}

function Dashboard() {
  const location = useLocation();
  return (
    <div>
      <h1>Info that i got is {location.state}</h1>
    </div>
  )
}

reportWebVitals();
