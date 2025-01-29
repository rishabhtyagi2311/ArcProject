import React from 'react'
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedRoom, UserAuthDetails } from '../../Atoms/atoms.js';
import {getSocket} from '../../services/socket.js' ;




function DoubtRoom() {


 

  const room = useRecoilValue(selectedRoom)                      
  const [msg , setMsg] = useState('')
  const [messages, setMessage] = useState([])
  const handleEditorChange = (value) => {
 
    setMsg(value);
  };
  const  socket = useMemo( () => 
    {
      const socket = getSocket()
      return socket.connect()
    })
  const userDetails = useRecoilValue(UserAuthDetails)
 
useEffect( () =>{


      socket.emit("ins-join-room" , {
        roomId: room,
        userId: userDetails.userID
      }
    )

      socket.on("success-join" , (msg) =>{
            console.log(msg);

            
      })

      socket.on("new-message", (data) => {
        setMessage((prev) => [...prev, data]);
        
        
      });

} , [])

function sendMsg() {
  if (msg) {
    socket.emit("new-message", {
      
      message: msg,
      roomId: room,
      username : userDetails.username,
      userId : userDetails.userID,
      
    });
    setMsg(""); 
  }
}
  return (


   
      <div className= "w-full h-full bg-gray-200 flex flex-col rounded-md ml-2 mr-3 mb-4">

        <div className= 'w-10/11 m-2 rounded-md overflow-y-scroll '>
          {
              messages && messages.length > 0 &&  
              messages.map((item, index) => (
              
                <div key ={index} className = 'w-10/12 m-4 h-28 bg-blue-300'>


                </div>
                  

              ))}
        </div>

      
        <div className = 'bg-slate-400 mt-auto flex flex-row justify-between items-center h-24 '>
          <div className=' w-full ml-10'>
            <input className = 'w-11/12 h-10 rounded-sm text-lg font-serif focus:outline-none p-2' 
              placeholder="Put Your Doubt here "
            onChange={(e) => handleEditorChange(e.target.value)
              
            }
            
            type="text" />
          </div>
          <div className='bg-blue-950 text-white font-serif font-semibold text-lg w-20 h-8 text-center mr-10 rounded-md'>
            <button onClick={ () => {
              sendMsg()

              
            }}>
              Post
            </button>
          </div>
         

        </div>
      </div>
      )}

export default DoubtRoom
