import {atom, selector} from 'recoil'
import { InsActions } from '../services/InsActions';

import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const loginState = atom({
    key: "loginState", 
    default: false,    
    effects_UNSTABLE: [persistAtom]
});
export const UserAuthDetails = atom({
    key: "UserAuthDetails",
    default : {
        role : "",
        userID : 0,
        username: ""
    },
    effects_UNSTABLE: [persistAtom],
})
export const CreatedRooms = atom({
    key : "CreatedRooms",
    default: []

})
export const selectedRoom  = atom({
    key : "selectedRoom",
    default : "",
    effects_UNSTABLE: [persistAtom]


})
export const RoomNumber = atom({
    key : "RoomNumber" , 
    default: 0
})


export const RoomFetchSelector = selector({
    key: "RoomFetchSelector",
    get: async ({ get }) => {
        try {
            const response = await InsActions.fetchRooms();
            console.log("RoomFetchSelector result:", response);
            return Array.isArray(response) ? response : [];
        } catch (error) {
            console.error("Error in RoomFetchSelector:", error);
            return [];
        }
    },
});


