import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL
class StudActions
{

    async joinroom(data)
    {   
        console.log(data);
        
        const id = data.userId
        try{

            const response = await axios.post(`${url}/studActions/joinroom`, 
                {
                    roomName : data.roomName,
                    roomId : data.roomCode,
                    userId: id
                }
            )
            console.log(response.data, "the backend reply ");
            
            return response.data
        }
        catch(error)
        {
            return error
        }

    }

    async fetchRooms(id)
    {
        try{
            const response = await  axios.get(`${url}/studActions/fetchrooms`,
                   {
                    params : { param1 : id}
                })
                
                if(response.data.message === "No rooms found for this user")
                    {
                        return []
                    }
                    console.log(response.data);
                    
                    return response.data
        }
        catch(error)
        {   
            console.log(error);
            
            return []

        }

    }
}

export const StudService = new StudActions()
