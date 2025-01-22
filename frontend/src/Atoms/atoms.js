import {atom, selector} from 'recoil'
import { InsActions } from '../services/InsActions';

export const loginState = atom({
    key: "loginState", // Unique key
    default: false,    // Default is logged out
});
export const UserAuthDetails = atom({
    key: "UserAuthDetails",
    default : {
        role : "",
        userID : null
    }
})
export const CreatedRooms = atom({
    key : "CreatedRooms",
    default: []

})

export const RoomNumber = atom({
    key : "RoomNumber" , 
    default: 0
})


export const RoomFetchSelector  = selector({

    key : "RoomFetchSelector",
    get : async ({get}) => {

        get(RoomNumber)

        try{

            const response = await InsActions.fetchRooms()
            if(response) return response
        }
        catch(error)
        {
            
            console.log(error , "fetching rooms");
            return "error fetching rooms"
        }
    }
})