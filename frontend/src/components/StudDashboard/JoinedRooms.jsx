import React from 'react'
import { useEffect, useState} from 'react'
import { useSetRecoilState, useRecoilValue} from 'recoil'
import {  joinedRooms,selectedRoom, UserAuthDetails, RoomNumber} from '../../Atoms/atoms'
import { format } from 'date-fns';
import { NavLink } from 'react-router-dom';
import { StudService } from '../../services/StudActions';

function JoinedRooms() {
  
  const rooms  = useRecoilValue(joinedRooms)
  const setRooms = useSetRecoilState(joinedRooms) 
  const [loading, setLoading] = useState(true); 
  const setRoom  = useSetRecoilState(selectedRoom)
  const UserDetails = useRecoilValue(UserAuthDetails)
  const roomNumber  = useRecoilValue(RoomNumber)
 
  useEffect(  () => {
    setLoading(true)
    setRooms([])

    let isMounted = true; 
    const fetchDataAsync = async () => {
      try {
          const result = await StudService.fetchRooms(UserDetails.userID);
       
          
          if (isMounted) {
              setRooms(result);
              console.log(rooms);
              
          }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    fetchDataAsync();
    setLoading(false)

    return () => {
      isMounted = false;
    };


  }, [roomNumber])


  
  

  
  return (
    <div className  = "w-full  ml-4 mr-4 mb-4 h-auto  bg-blue-950 rounded-md  overflow-y-scroll flex flex-col ">

  

      {loading ? "loading....." : 
        <ul>
          { rooms && rooms.length > 0 ? (
              rooms.map((item) => (
                  <li key={item.id}>
                  <div className='w-11/12 h-max bg-blue-300 rounded-md mt-4 ml-10 mb-2 flex flex-col'>

                  <div className='text-2xl font-serif font-semibold text-sky-950 mt-2 ml-4'>
                  {item.roomName}
                  </div>
                      <div className = 'flex flex-row justify-between mt-2'>
                       
                        <div className =' text-xl font-serif font-medium text-sky-950 ml-4'>
                        Members: {item.members}
                        </div>
                        <div  className ='mr-4 text-xl font-serif font-medium text-sky-950'>
                        {format(new Date(item.joinedAt), 'MMMM d, yyyy')}
                        </div>
                      </div>
                      <div className='mt-2 justify-end flex flex-row'>
                        <NavLink to ='../doubts'>
                          <button className='text-lg bg-sky-950 font-serif text-white mb-4 rounded-md w-20 mr-2 h-8 ' onClick={() => {
                            
                            
                            setRoom(item.roomName)
                          }}>
                          Visit
                          </button>
                        </NavLink>
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

export default JoinedRooms
