import React from 'react'
import { NavLink } from 'react-router-dom'

function JoinCard(props) {
  return (
    <div className="p-4 shadow-lg rounded-md mr-4 my-4 bg-gradient-to-r from-gray-800 via-sky-800 to-gray-900 border border-gray-700">
      {/* Header Text */}
      <div className="text-xl text-sky-300 font-serif font-medium mb-2">
        Join as
      </div>

      {/* Title and Icon */}
      <div className="flex flex-row items-center justify-between">
        {/* Title */}
        <div className="text-2xl font-serif font-semibold text-sky-200">
          {props.title}
        </div>

      
        <NavLink to={props.link}>
          <div className="text-sky-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
              />
            </svg>
          </div>
        </NavLink>
      </div>
    </div>
  )
}

export default JoinCard
