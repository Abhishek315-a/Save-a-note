import * as React from "react";
import * as ReactDOM from "react-dom";
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import './App.css'
import NavBar from "./components/NavBar";
import AllPaste from "./components/AllPaste";
import ViewPaste from "./components/ViewPaste";
import Home from "./components/Home";

const router  = createBrowserRouter([

  {
    path:"/",
    element:
    <div>
      <NavBar/>
      <Home/>
    </div>
  },
  {
    path:"/AllPaste",
    element:
    <div>
      <NavBar/>
      <AllPaste/>
    </div>
  },
  {
    path:"/AllPaste/:id",
    element:
    <div>
      <NavBar/>
      <ViewPaste/>
    </div>
  },
])
function App() {


  return (
    <div>
        <RouterProvider router= {router}/>
    </div>
  )
}

export default App
