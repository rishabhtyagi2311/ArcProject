import React from 'react'
import { useForm } from 'react-hook-form'


function CreateRoom() {

  const { 
  register,
  handleSubmit, 
  formState : {errors, isSubmitting},
  reset
  } = useForm()

  const CreateCourseRoom = (data) => {

    console.log(data);
    
  }
  return (
    <div className = 'flex w-full h-full justify-center'>
      
      <div className = 'h-44 w-5/6 bg-blue-300 mt-10 rounded-md ml-4 flex flex-col items-center'>


        <div className = 'text-sky-950 font-bold text-2xl font-serif my-4'>
          Create A New Course 
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
            placeholder='Enter Course Name'  
            {...register("roomName" , {
              required : true
            })}
              
            />
        </div>

        <div className= 'mt-6 w-full flex justify-end'>
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
