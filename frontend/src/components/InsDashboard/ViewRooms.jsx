import React from 'react'
import { useEffect, useState} from 'react'
import { useRecoilValueLoadable, useRecoilState} from 'recoil'
import { RoomFetchSelector, CreatedRooms } from '../../Atoms/atoms'
import { format } from 'date-fns';

function ViewRooms() {
  
  const data = useRecoilValueLoadable(RoomFetchSelector)
  const [rooms , setRooms]  = useRecoilState(CreatedRooms)
  const [loading, setLoading] = useState(true);     // Managing loading state
 

  useEffect(() => {
    if (data.state) {
      setLoading(false); 
      setRooms(data.contents)
 
    }
  }, [data]); 


  
  return (
    <div className  = "w-full  ml-4 mr-4 mb-4 h-auto  bg-blue-950 rounded-md  overflow-y-scroll flex flex-col ">

      {loading ? "loading....." : 
        <ul>
        { rooms && rooms.length > 0 ? (
          rooms.map((item) => (
              <li key={item.id}>
                <div className='w-11/12 h-max bg-blue-300 rounded-md mt-4 ml-10 mb-2 flex flex-col'>

                  <div className='text-2xl font-serif font-semibold text-sky-950 mt-2 ml-4'>
                    {item.name}
                  </div>
                  <div className = 'flex flex-row justify-between mt-2'>
                    <div className ='ml-4 text-xl font-serif font-medium text-sky-950'>
                      Code : {item.code}
                    </div>
                    <div className =' text-xl font-serif font-medium text-sky-950'>
                       Members: {item.members}
                    </div>
                    <div  className ='mr-4 text-xl font-serif font-medium text-sky-950'>
                      {format(new Date(item.createdAt), 'MMMM d, yyyy')}
                    </div>
                  </div>
                  <div className='mt-2 justify-end flex flex-row'>
                    <button className='text-lg bg-sky-950 font-serif text-white mb-4 rounded-md w-20 mr-2 h-8'>
                      Visit
                    </button>
                  </div>


                </div>
              </li> 
            ))
          ) : (
            <p>No rooms available.</p> 
          )}
        </ul>
      }
    
    </div>
  )
}

export default ViewRooms
