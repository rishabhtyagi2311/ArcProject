import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'


import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home'
import Signin from './components/SignIn/Signin'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<App/>}>  
        <Route path ='' element = {<Home/>}></Route>
        <Route path = 'signin' element = {<Signin/>}></Route>
    </Route>
  )

)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router}></RouterProvider>
  </StrictMode>,
)
