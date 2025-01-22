import axios from "axios";
import { UserAuthDetails } from "../Atoms/atoms";
import { useRecoilValue } from "recoil";

class InsActionsService 
{

    async createRoom(data)
    {   
        console.log(data);
        
        const id = data.userID?  data.userID : 11; 
        try{

            const response = await axios.post("http://localhost:4000/insActions/createRoom", 
                {
                    name : data.roomName,
                    code : data.roomCode,
                    userId: id
                }
            )
            return response.data
        }
        catch(error)
        {
            return error
        }

    }
    async fetchRooms()
    {
        const userDetails = useRecoilValue(UserAuthDetails)
        const id = userDetails.userID 
        try{
            
            const response = await  axios.get("http://localhost:4000/insActions/rooms" , 
                {
                    userId: id
                }
            )
            if(response)
            {
                return response.data
            }
            return "error fetching rooms"
        }
        catch(error)
        {   
            console.log(error);
            
            return error

        }
    }
  
}


const InsActions = new InsActionsService()

export {InsActions}