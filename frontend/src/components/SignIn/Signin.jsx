import React from 'react'
import { useForm } from 'react-hook-form';
import {InsAuth, StudAuth} from '../../services/authServices';
import { useNavigate } from 'react-router-dom';

function Signin() {

  const navigate = useNavigate();
  const {
    register: registerInstructor,
    handleSubmit: handleInstructorSubmit,
    formState: { errors: instructorErrors, isSubmitting: isInstructorSubmitting },
  } = useForm();


  const {
    register: registerStudent,
    handleSubmit: handleStudentSubmit,
    formState: { errors: studentErrors, isSubmitting: isStudentSubmitting },
  } = useForm();
  const onInsSubmit = async (data) =>{
  
        const response = await InsAuth.login(data) 

        console.log(response);
        navigate('../InsDashboard');
   
    }
  const onStudSubmit = async (data) => {
    console.log(data);
  
    const response = await StudAuth.login(data) 

    console.log(response);
   navigate('../StudDashboard')
   
  }
return (
  <div className='flex flex-row bg-gray-300 w-screen h-screen items-center justify-evenly'>
    <div className= 'w-3/12 h-max rounded-md bg-white flex flex-col border-solid border-blue-400 border-4 items-center '>
      <div className = 'pt-8 pb-6 text-2xl font-semibold font-serif text-blue-950'>
          Instructor Sign In  
      </div>
      <div className = 'flex flex-col items-center w-full'>
        <form onSubmit = {handleInstructorSubmit(onInsSubmit)}>
          <div >
            <span className="text-blue-500 pr-4  text-xl">•</span>
            <input
              className="border-b-2 pt-6 border-blue-500 rounded-sm focus:outline-none"
              type="text"
              placeholder="Email"
              {...registerInstructor("email", {
                required: true,
                minLength: { value: 5, message: "Email must be at least 5 characters long" },
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
              })}
            />
          
            {instructorErrors.email?.type === "required" && (
              <span className="block text-red-700 pl-6">Email is required</span>
            )}
      
            {instructorErrors.email?.type === "minLength" && (
              <span className="block text-red-700 pl-6">{instructorErrors.email.message}</span>
            )}
    
            {instructorErrors.email?.type === "pattern" && (
              <span className="block text-red-700 pl-6">{instructorErrors.email.message}</span>
            )}
          </div>
          <div>
            <span className="text-blue-500 pr-4 text-xl">•</span>
            <input
              className="border-b-2 pt-6 border-blue-500 rounded-sm focus:outline-none"
              type="password"
              placeholder="Password"
              {...registerInstructor("password", {
                required: "Password is required",
                minLength: { value: 8, message: "Password must be at least 8 characters long" },
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character",
                },
              })}
            />
        
            <span className="block text-red-700 pl-6">
              {instructorErrors.password?.message}
            </span>
          </div>
          <div className ='pt-8 pb-14'>
            <input className= 'w-full h-8 bg-blue-300 font-semibold font-serif' type="submit" value = {isInstructorSubmitting? "Proccessing...": "Proceed"} />
          </div>
        </form>

      </div>
    </div>

    <div className= 'w-3/12 h-max rounded-md bg-white flex flex-col border-solid border-blue-400 border-4 items-center '>

      <div className = 'pt-8 pb-6 text-2xl font-semibold font-serif text-blue-950'>
          Student Sign in 
      </div>
      <div className = 'flex flex-col items-center w-full'>
        <form onSubmit = {handleStudentSubmit(onStudSubmit)}>
            <div >
              <span className="text-blue-500 pr-4  text-xl">•</span>
              <input
                className="border-b-2 pt-6 border-blue-500 rounded-sm focus:outline-none"
                type="text"
                placeholder="Email"
                {...registerStudent("email", {
                  required: true,
                  minLength: { value: 5, message: "Email must be at least 5 characters long" },
                  pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
                })}
              />
            
              {studentErrors.email?.type === "required" && (
                <span className="block text-red-700 pl-6">Email is required</span>
              )}
        
              {studentErrors.email?.type === "minLength" && (
                <span className="block text-red-700 pl-6">{studentErrors.email.message}</span>
              )}

              {studentErrors.email?.type === "pattern" && (
                <span className="block text-red-700 pl-6">{studentErrors.email.message}</span>
              )}
            </div>
            <div>
              <span className="text-blue-500 pr-4 text-xl">•</span>
              <input
                className="border-b-2 pt-6 border-blue-500 rounded-sm focus:outline-none"
                type="password"
                placeholder="Password"
                {...registerStudent("password", {
                  required: "Password is required",
                  minLength: { value: 8, message: "Password must be at least 8 characters long" },
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must include at least 1 uppercase letter, 1 lowercase letter, 1 digit, and 1 special character",
                  },
                })}
              />
          
              <span className="block text-red-700 pl-6">
                {studentErrors.password?.message}
              </span>
            </div>

        
            
            <div className ='pt-8 pb-14'>
              <input className= 'w-full h-8 bg-blue-300 font-semibold font-serif' type="submit" value = {isStudentSubmitting? "Proccessing...": "Proceed"} />
            </div>


        </form>

      </div>

    </div>
    </div>
  )
}

export default Signin
