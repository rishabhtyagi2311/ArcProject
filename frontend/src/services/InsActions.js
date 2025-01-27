import axios from "axios";
import { UserAuthDetails } from "../Atoms/atoms";
import { useRecoilValue } from "recoil";

class InsActionsService 
{

    async createRoom(data)
    {   
        console.log(data);
        
        const id = data.userId
        try{

            const response = await axios.post("http://localhost:4000/insActions/createRoom", 
                {
                    name : data.roomName,
                    code : data.roomCode,
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
    async fetchRooms(userDetails)
    {
        const id =    userDetails.userID   
        console.log(userDetails);
        
        try{
            
            const response = await  axios.get("http://localhost:4000/insActions/rooms" , 
                {
                    params : { param1 : id}
                }
            )
          
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


const InsActions = new InsActionsService()

export {InsActions}