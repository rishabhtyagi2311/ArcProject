import React from 'react'

function PopupCard({title,text,icon:Icon}) {
  return (
    <div className='relative flex flex-col rounded-md shadow-md w-2/3 h-max items-center animate-slideUp mb-5'>

        <div className= 'text-lg font-serif font-semibold text-sky-800'>
            {title}
        </div>
        <div className='text-base p-2 text-center'>
            {text}
        </div>

        <div className="absolute -bottom-1 right-2 mb-2 z-1">
            <Icon></Icon>
        </div>

      
    </div>
  )
}

export default PopupCard

