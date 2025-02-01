import React from 'react'
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue ,useRecoilValueLoadable, useSetRecoilState} from 'recoil';
import { selectedRoom, UserAuthDetails,doubts } from '../../Atoms/atoms.js';
import {getSocket} from '../../services/socket.js' ;
import { format, set } from 'date-fns';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import {ActionService} from "../../services/common.js"


function StudentDoubts() {

 

  const room = useRecoilValue(selectedRoom)                      
  const [msg , setMsg] = useState('')
  const [messages, setMessage]  = useState([])
  const [loading, setLoading] = useState(true)

  const handleEditorChange = (value) => {
 
    setMsg(value);
  };
  const  socket = useMemo( () => 
    {
      const socket = getSocket()
      return socket.connect()
    },[])
  const userDetails = useRecoilValue(UserAuthDetails)
    const [VoteChangeCounter , setVoteChangeCounter] = useState(0)

  const VoteHandler = async(data) => {

    console.log(data.id, data.updateType , "in handleer ");
    
    const response= await ActionService.updateVote(data.id, data.updateType)
      if(response.success)
      {
         setVoteChangeCounter((prev) => prev+1)
          
      }
    }
 
useEffect( () =>{
  setLoading(true)
  let isMounted  = true

  const doubtsFetch = async() => {
    try{
      const result = await ActionService.fetchDoubts(room)
      
      if(isMounted)
      {
          setMessage(result.data)
          socket.emit("voteUpdated" , (room))
         
          
      } 
    }
    catch(e)
    {
      console.log("error in fetching doubts ");
      
    }
    finally {
      setLoading(false); 
    }

  }
  doubtsFetch()

      socket.emit("ins-join-room" , {
        roomId: room,
        userId: userDetails.userID
      }
    )

      socket.on("success-join" , (msg) =>{
            console.log(msg);

            
      })

      socket.on("new-message", (data) => {
        setMessage((prev) => {
       
          const prevMessages = Array.isArray(prev) ? prev : [];

          return [...prevMessages, data];
        });
      });
     
     socket.on("voteUpdated" , (data) =>{
        setMessage(data)
     })
      
      
      
    return () => {
      isMounted = false;
    };

} , [VoteChangeCounter])

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

        {loading? "Loading Doubts...." : 
          <div className= 'w-10/11  rounded-md overflow-y-scroll '>
           {
            messages && messages.length > 0 &&  
            messages.map((item, index) => (
            
              <div key ={index} className = 'w-11/12  h-max bg-slate-300 rounded-md p-2 justify-self-center mt-4'>

                <div className='flex flex-row'>
                  
                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                      <span className="text-sky-600 font-semibold text-lg">
                        {item.username.charAt(0).toUpperCase()}
                      </span>
 
                    </div>
                  <div>
                    <div className = 'ml-2 text-lg font-serif font-semibold'>
                      {item.username}
                    </div>
                    <div className= 'ml-2 text-sm'>
                        {format(new Date(item.createdAt), 'MMMM d, yyyy')}
                    </div>  
                
                  </div>

                </div>

                <div className= 'font-serif mt-4 ml-4 whitespace-pre-line mb-4 border-t border-black overflow-x-auto'>
                  {item.message} 
                </div>
                <div className = 'ml-4 border-t border-black flex flex-row space-x-4 mt-2 p-4'>
                    <button className="flex items-center space-x-1 text-slate-500 hover:text-sky-600 transition-colors duration-200" onClick={
                      () => VoteHandler({id: item.id, updateType: "up"})
                    } >
                        <ThumbsUp size={18} />
                    </button>
                    <button className="flex items-center space-x-1 text-slate-500 hover:text-slate-700 transition-colors duration-200" onClick={
                      () => VoteHandler({ id: item.id, updateType: "down" })
                  }
                      >
                      <ThumbsDown size={18} />
                    </button>
                    <span className="text-slate-600 font-medium">{item.voteCount} votes</span>
                </div>
               
               

              </div>
                

            ))}
        </div>}

      
        <div className = 'bg-slate-400 mt-auto flex flex-row justify-between items-center h-24 '>
          <div className=' w-full ml-10'>
          <textarea className = 'w-11/12 h-10 rounded-sm text-lg font-serif focus:outline-none p-2' 
              placeholder="Put Your Doubt here "
            onChange={(e) => handleEditorChange(e.target.value)
              
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.shiftKey) {
                e.preventDefault(); 
                handleEditorChange((prev) => prev + "\n");
              }
            }}
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
      )
}

export default StudentDoubts
