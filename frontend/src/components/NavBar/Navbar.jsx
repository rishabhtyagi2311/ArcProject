import React from 'react'
import { NavLink } from 'react-router-dom';
function Navbar() {
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
            <li>
             <NavLink
             to= "/signin"  
             className = { ({isActive}) => `
             font-serif font-bold  text-xl pr-4
             `}>
              SignIn
             </NavLink>
            </li>
            
          </ul>
       
      </div>
    </div>
   </>
  )
}

export default Navbar;
