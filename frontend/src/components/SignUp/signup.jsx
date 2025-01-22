import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {InsAuth, StudAuth} from '../../services/authServices';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../Atoms/atoms';
import { UserAuthDetails } from '../../Atoms/atoms';


function Signup() {

    const location = useLocation(); // Get the current location (route path)
    const isInstructor = location.pathname.includes('ins');
    const isStudent = location.pathname.includes('stud');
   
    const navigate = useNavigate()
    const setLoggedState = useSetRecoilState(loginState)
    const setAuthDetails = useSetRecoilState(UserAuthDetails)
    const  {
      register,
      handleSubmit,
    
      formState : {errors, isSubmitting}

    } = useForm();

    const onSubmit = async (data) =>{
        console.log(data);
        if(isInstructor)
        {
            const response = await InsAuth.SignUp(data) 
            localStorage.setItem("accessToken" , response.accessToken)
            localStorage.setItem("refreshToken", response.refreshToken)
            setLoggedState(true);
            setAuthDetails({
              role : response.role,
              userID : response.id
            })

            navigate("/InsDashboard")
         
        }
        if(isStudent)
        {
          const response = await StudAuth.SignUp(data)
          localStorage.setItem("accessToken" , response.accessToken)
          localStorage.setItem("refreshToken", response.refreshToken)
          setLoggedState(true);
        
          navigate("/StudDashboard")
          
        }
    }
    return (
        <div className='flex flex-col bg-gray-300 w-screen h-screen items-center justify-center'>
          <div className= 'w-3/12 h-max rounded-md bg-white flex flex-col border-solid border-blue-400 border-4 items-center '>

            <div className = 'pt-8 pb-6 text-2xl font-semibold font-serif text-blue-950'>
                  Create Your Account
            </div>
            <div className = 'flex flex-col items-center w-full'>
              <form onSubmit = {handleSubmit(onSubmit)}>
                  <div >
                    <span className="text-blue-500 pr-4  text-xl">•</span>
                    <input
                      className="border-b-2 pt-6 border-blue-500 rounded-sm focus:outline-none"
                      type="text"
                      placeholder="Email"
                      {...register("email", {
                        required: true,
                        minLength: { value: 5, message: "Email must be at least 5 characters long" },
                        pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email format" },
                      })}
                    />
                  
                    {errors.email?.type === "required" && (
                      <span className="block text-red-700 pl-6">Email is required</span>
                    )}
              
                    {errors.email?.type === "minLength" && (
                      <span className="block text-red-700 pl-6">{errors.email.message}</span>
                    )}
             
                    {errors.email?.type === "pattern" && (
                      <span className="block text-red-700 pl-6">{errors.email.message}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-blue-500 pr-4 text-xl">•</span>
                    <input
                      className="border-b-2 pt-6 border-blue-500 rounded-sm focus:outline-none"
                      type="password"
                      placeholder="Password"
                      {...register("password", {
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
                      {errors.password?.message}
                    </span>
                  </div>

               
                  <div>
                    <span className="text-blue-500 pr-4 text-xl">•</span>
                    <input
                      className="border-b-2 pt-6 border-blue-500 rounded-sm focus:outline-none"
                      type="text"
                      placeholder="Username"
                      {...register("username", {
                        required: "Username is required",
                        minLength: { value: 3, message: "Username must be at least 3 characters long" },
                      })}
                    />
                   
                    <span className="block text-red-700 pl-6">
                      {errors.username?.message}
                    </span>
                  </div>
                  <div className ='pt-8 pb-14'>
                    <input className= 'w-full h-8 bg-blue-300 font-semibold font-serif' type="submit" value = {isSubmitting? "Proccessing...": "Sign Up"} />
                  </div>


              </form>

            </div>

          </div>
        </div>
      )
    }

export default Signup
