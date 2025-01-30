import axios from "axios";
const url = import.meta.env.VITE_BACKEND_URL
class CommonActionService
{

    async fetchDoubts(room)
    {   
        try
        {
            const doubts = await axios.get(`${url}/common/doubts/${room}`)
            if(doubts)
            {
                return doubts
            }

        }
        catch(e)
        {
            console.log(e);
            
            return []
        }

    
    }


    async updateVote(id, updateType)
    { 
        console.log(id, updateType);
        
        
        try{
            const result = await axios.post(`${url}/common/updateVoteCount` , 
                {
                    doubtId: id,
                    updateType: updateType

                }
            )

            if(result) {
                console.log(result);
                
                return result.data
            }
                else return "error"
        }
        catch(e)
        {
            console.log(e);
            return "error"
            
        }
    }
}

export const ActionService =  new CommonActionService()