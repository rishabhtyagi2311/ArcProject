import React from 'react'

import JoinCard from '../JoinCard/JoinCard';
import PopupCard from '../PopUpCard/PopupCard';

const JoinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z" />
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
  </svg>
);

const RelevanceIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
  </svg>
);



function Home() 
{
 
  
  return (
  <>
    <div className='bg-gray-300 h-max w-screen flex flex-col items-center '>

     
      <div className='bg-white h-max  w-11/12 mt-16 mb-2 grid  grid-cols-1 md:grid-cols-2  rounded-md'>
     
        <div className=' flex flex-col justify-center pl-6  '>
            <div className='animate-fadeIn text-7xl font-serif text-slate-700'>Ask</div>
            <div className='animate-fadeIn text-7xl font-serif text-slate-800'>Resolve</div>
            <div className='animate-fadeIn text-7xl font-serif text-slate-900'>Collaborate</div>
        
            <div className=' grid  grid-cols-2 md:grid-cols-3 mt-10'> 
                <PopupCard title='Join' text= "Access course's timelines, build network and start resolving relevant doubts" icon = {JoinIcon} 
                className='cols-span-1'
                />
                <PopupCard title='Share' text= "Ask Doubt and Posts Review! Share it with your instructor and peers." icon = {ShareIcon} 
                className='cols-span-1'
                />
                <PopupCard title='Relevance' text= "UpVote or DownVote for relevant doubts and help improve the course." icon = {RelevanceIcon} 
                                className='cols-span-1'
                 />
            </div>
           
        </div>
       



        <div className=' flex flex-col  justify-end'>
            <div className='pt-1 pb-1 pl-1 bg-gray-300 rounded-l-md w-full'>
              <img 
                src="div1_home.avif" 
                className='w-full h-auto md:w-full md:h-auto rounded-md' 
                alt="Image"
              />
            </div>
            <div className  = 'grid grid-cols-1 md:grid-cols-2  mx-2 md:mx-4 '>
                  <JoinCard  title = "Intructor" link = '/signup/ins' />
                  <JoinCard  title="Student" link = '/signup/stud'/>
            </div>
            
        
        </div>
                                                                 
      </div>

      <div className="overflow-hidden w-11/12 bg-slate-800  h-10 rounded-md">
                <div className="animate-marquee whitespace-nowrap text-2xl font-semibold text-sky-50">
            A Seamless Hub for Students to Engage, Share Insights, and Collaborate, while Empowering Instructors to Streamline Course Management and Focus on What Matters Most.
                </div>
            </div>

    </div>
  </>
  )
}

export default Home;
