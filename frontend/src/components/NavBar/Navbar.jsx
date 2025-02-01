import React from 'react'
import { NavLink } from 'react-router-dom';
import { useRecoilState,useRecoilValue} from 'recoil';
import { loginState, UserAuthDetails} from '../../Atoms/atoms';
import { User } from 'lucide-react';
function Navbar() {

  const [loggedState, setLoggedState] = useRecoilState(loginState)
  const details =useRecoilValue(UserAuthDetails)


  function handleClick()
  {
    if(loggedState)
    {
        localStorage.removeItem("accessToken")

        localStorage.removeItem("refreshToken")

        console.log("token deleted");

        setLoggedState(false)

        
    }
   
    
  }
  return (
   <>
    
    <div className='h-12 w-[30rem] md:w-[60rem] lg:w-[88rem] bg-slate-100 rounded-md  z-50 
    fixed top-2 flex flex-row items-center mx-16'>
      
      <div className='text-4xl text-sky-950 font-serif font-bold  mx-4'>
        <ul>
          <li>
            <NavLink to ='/'>
                Arc
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='flex flex-row justify-end w-full'>
          <ul className='flex flex-row' >

            {loggedState && 
            <li>
              <NavLink
             className='text-2xl text-sky-950 font-serif font-bold  mx-4'
             to= {details.role == 'Ins' ? "/insDashboard" : "/studDashboard"}
             
              >
                Dashboard
             </NavLink>
            </li>
            }

            <li>
            

             <NavLink
             className='text-2xl text-sky-950 font-serif font-bold  mx-4'
             to= {loggedState? "/" : "/signin"}
             onClick={handleClick}
              >
              {loggedState? "LogOut " : "SignIn"}
             </NavLink>
            </li>
                 
          </ul>
       
      </div>
    </div>
   </>
  )
}

export default Navbar;
