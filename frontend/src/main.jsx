import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'


import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home'
import Signin from './components/SignIn/Signin'
import  Signup from './components/SignUp/signup'
import InsDashboard from './components/InsDashboard/insDashboard.jsx'
import StudDashboard from './components/StudDashboard/studDashboard.jsx'
import { RecoilRoot } from 'recoil'
import CreateRoom from './components/InsDashboard/CreateRoom.jsx' 
import ViewRooms from './components/InsDashboard/ViewRooms.jsx'
import AccountDetails from './components/InsDashboard/AccountDetails.jsx'
import DoubtRoom from './components/InsDashboard/DoubtRoom.jsx'
import ProtectedRouteIns from './components/Protector/RouteProtector.jsx'
import ProtectedRouteStud from './components/Protector/RouterProtectorStud.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element = {<App/>}>  
        <Route path ='' element = {<Home/>}></Route>
        <Route path = 'signin' element = {<Signin/>}></Route>
        <Route path = 'signup/ins' element = {<Signup/>}></Route>
        <Route path = 'signup/stud' element = {<Signup/>}></Route>
        
       
        <Route element = {<ProtectedRouteIns></ProtectedRouteIns>}>
          <Route path = 'insDashboard' element = {<InsDashboard/>}>
            <Route path = 'createroom' element= {<CreateRoom/>}></Route>
            <Route path = 'viewrooms' element= {<ViewRooms/>}></Route>
            <Route path = 'details' element= {<AccountDetails/>}></Route>
            <Route path = 'doubts' element = {<DoubtRoom/>}></Route>
          </Route>


         
        </Route>


        <Route element = {<ProtectedRouteStud></ProtectedRouteStud>}>
        
            <Route path = 'studDashboard' element = {<StudDashboard/>}></Route>
      
        </Route>
       
    </Route>
  )

)
createRoot(document.getElementById('root')).render(

    <RecoilRoot>
    
    <RouterProvider router = {router}></RouterProvider>
    </RecoilRoot>

)
