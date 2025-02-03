import express from "express"
import prisma from "./../prisma/prisma.js"

const StudActionRouter =express.Router()



StudActionRouter.post('/joinroom' , async(req, res)  => {


    const {roomName, roomId, userId} = req.body


    try{
        
        const existRoom = await prisma.courseRoom.findFirst(
           { where: {
                code: roomId
                
            }}
        
        )
        if(existRoom)
        {
            const alreadyJoin = await prisma.studentCourses.findFirst({
                where: {roomName,
                    StudentId : userId
                }
            })
            if(alreadyJoin)
            {
                return res.status(400).json({message:"Already Joined this room"})
            }
            const new_room = await prisma.studentCourses.create({
                data: {
                        roomName,
                        members : existRoom.members + 1,
                        creatorId: existRoom.creatorId,
                        StudentId: userId

                 }
            })

            if(new_room)
            {

                await prisma.courseRoom.update({
                    where: {code: roomId},
                    data:{
                        members : {increment : 1}
                    }
                })

                await prisma.studentCourses.updateMany({
                    where : {roomName},
                    data: {
                        members : {increment:1}
                    }
                })
                console.log(new_room);
                
                return res.status(200).json(new_room)
            }
            else{
                return res.status(400).json({message: "Cannot join this room "})
            }
        }
        else
        {
            return res.status(400).json({message: "No such room found"})
        }
    }
    catch(e)
    {
        console.log(e)
        return "Error";
        
    }
})


StudActionRouter.get('/fetchrooms' , async(req, res) => {

    const userId = parseInt(req.query.param1, 10)

    try{

         const rooms = await prisma.studentCourses.findMany({
            where : {
                StudentId: userId
            }
         })

         if(rooms)
         {
            console.log(rooms);
            return res.status(200).json(rooms)
            
         }
         else{
            return res.status(400).json({message: "No rooms found for this user"})
         }
    }
    catch(e)
    {
        console.log(e);
        return res.status(500).json({message: "No rooms found for this user"})        
    }

})  


export default StudActionRouter