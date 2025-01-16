import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';

function StudDashboard() {


  const [hbMenu, setHbMenu]  = useState(false)
  useEffect(() => {
    // Function to check screen size
    const checkScreenSize = () => {
      setHbMenu(window.innerWidth > 768); 
    };

    // Initial check
    checkScreenSize();

    // Add event listener to handle resize
    window.addEventListener("resize", checkScreenSize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className='bg-gray-300 h-screen w-screen flex flex-col justify-center items-center'>

      <div className = 'bg-white w-11/12 h-5/6 mt-12 rounded-md flex flex-col'>

        <div className= 'bg-blue-950 w-auto h-10 rounded-md m-2 flex flex-row items-center'>
        
         <div className='pl-2 hover-cursor'>
           <button onClick={() => setHbMenu(!hbMenu)}>


           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-7">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
           </button>
         </div>


        </div>


        <div className = 'flex flex-row'>
          
          <div className={`w-52 h-96 bg-blue-950 rounded-md ml-2 ${ hbMenu ? "flex" : "hidden" } flex-col items-start `} >
              <div className='mt-6 text-white font-semibold font-serif w-44 ml-6 shadow-xl'>
                <NavLink>
                  Home 
                </NavLink>
              </div>
              <div className='mt-6 text-white font-semibold font-serif w-44 ml-6 shadow-xl'>
                <NavLink>
                  Join 
                </NavLink>
              </div>
             
              <div className='mt-6 text-white font-semibold font-serif w-44 ml-6 shadow-xl'>
                <NavLink>
                  Account
                </NavLink>
              </div>
          </div>
        </div>
  
      </div>

    </div>
  )
}

export default StudDashboard
