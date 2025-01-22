import React from 'react'
import { useForm } from 'react-hook-form'
import { InsActions } from '../../services/InsActions'
import { useRecoilValue, useSetRecoilState} from 'recoil'
import { UserAuthDetails, RoomNumber } from '../../Atoms/atoms'


function CreateRoom() {

  const userDetails  = useRecoilValue(UserAuthDetails)
  const setRoomNumber = useSetRecoilState(RoomNumber) 
  const { 
  register,
  handleSubmit, 
  formState : {errors, isSubmitting},
  reset
  } = useForm()

  const CreateCourseRoom = async  (data) => {
 
     const response  = await InsActions.createRoom({
     roomName : data.roomName,
     roomCode : data.roomCode,
     userId : userDetails.userID

    })
    setRoomNumber((prev) => prev + 1)
    console.log(response , " room creation response");
    
    
  }
  return (
    <div className = 'flex w-full h-full justify-center'>
      
      <div className = 'h-max w-5/6 bg-blue-300 mt-10 rounded-md ml-4 flex flex-col items-center'>


        <div className = 'text-sky-950 font-bold text-2xl font-serif my-4'>
          Create A New Course Room
        </div>

        <form onSubmit={handleSubmit( (data) => 
        { 
            CreateCourseRoom(data)
            reset()
        }

        )}>
          <div className ='w-96 h-10 b'>
            <input className= 'w-full h-full rounded-sm p-2 focus:outline-none'
            type="text"
            placeholder='Enter Room Name'  
            {...register("roomName" , {
              required : "Room Name is required"
            })}
            
              
            />
              <span className="block text-red-700 pl-6 mb-2">
            {errors.roomName?.message}        
            </span>
        </div>
        <div className ='w-96 h-10 b mt-6'>
            <input className= 'w-full h-full rounded-sm p-2 focus:outline-none'
            type="text"
            placeholder='Enter Room Code'  
            {...register("roomCode" , {
              required :"Room Code is required"
            })}
              
            />
            <span className="block text-red-700 pl-6">
            {errors.roomCode?.message}        
            </span>

        </div>

        <div className= 'mt-6 mb-4 w-full flex justify-end'>
          <input 
           type = 'submit'
           className = 'bg-sky-950 w-20 h-8 rounded-md text-white font-serif '
           value ={ isSubmitting ? "Creating " : "Create"}
           />
        </div>
        </form>




      </div>
    </div>
  )
}

export default CreateRoom
