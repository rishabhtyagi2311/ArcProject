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
}

export const ActionService =  new CommonActionService()