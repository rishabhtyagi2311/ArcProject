import {atom} from 'recoil'

export const loginState = atom({
    key: "loginState", // Unique key
    default: false,    // Default is logged out
});

export const CreatedRooms = atom({
    key : "CreatedRooms",
    default: []

})