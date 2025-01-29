
import prisma from "../prisma/prisma.js";


export const createDoubt = async ({message, username, roomId, userId}) => {

    const doubt = await prisma.doubts.create( {
       data: {
        message,
        username,
    
        roomId,
        userId

       }

    })
    console.log(doubt);
    
    if(doubt) return doubt
    return "Error"
}