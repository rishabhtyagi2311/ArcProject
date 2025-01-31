import React from 'react'
import { StudService } from '../../services/StudActions'
import { useForm } from 'react-hook-form'
import { UserAuthDetails, RoomNumber } from '../../Atoms/atoms'
import { useRecoilValue, useSetRecoilState } from 'recoil'
function JoinRoom() 
{
        const userDetails  = useRecoilValue(UserAuthDetails)
        const setRoomNumber = useSetRecoilState(RoomNumber) 
        console.log(userDetails);
        
        const { 
        register,
        handleSubmit, 
        formState : {errors, isSubmitting},
        reset
        } = useForm()

        const JoinCourseRoom = async (data) => {
            console.log(data, userDetails.userID , "here ");
            

        const response  = await StudService.joinroom({
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
                Join a new  Course Room
            </div>

            <form onSubmit={handleSubmit( (data) => 
            { 
                JoinCourseRoom(data)
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
                value ={ isSubmitting ? "Joining" : "Join"}
                />
            </div>
            </form>




            </div>
        </div>
        )
}

export default JoinRoom
