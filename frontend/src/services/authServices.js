import axios from "axios"

class InsAuthService 
{

   async SignUp ({email, password, username}) 
   {
    
        try
        {
            const response =  await axios.post('http://localhost:4000/insAuth/signup',
                {
                    email,
                    password,
                    username
                }
            )
            
            return response.data
            
        }
        catch(error)
        {
    
            return error
        }

    }
    async login ({email, password})
    {
        try{

            const response = await axios.post('http://localhost:4000/insAuth/login', 
                 {
                    email, 
                    password
                 }
            )
    
            return response.data
            

        }
        catch(error)
        {
         
            return error
        }
    }


}

class StudAuthService {

    async SignUp ({email, password, username}) 
   {
    
        try
        {
            const response =  await axios.post('http://localhost:4000/studAuth/signup',
                {
                    email,
                    password,
                    username
                }
            )
            
            return response.data
            
        }
        catch(error)
        {
    
            return error
        }

    }
    async login ({email, password})
    {
        try{

            const response = await axios.post('http://localhost:4000/studAuth/login', 
                 {
                    email, 
                    password
                 }
            )
    
            return response.data
            

        }
        catch(error)
        {
         
            return error
        }
    }
}

const InsAuth = new InsAuthService();
const StudAuth = new StudAuthService();
export {InsAuth , StudAuth};
