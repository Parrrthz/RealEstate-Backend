import asyncHandler from 'express-async-handler';
import { prisma } from "../config/prismaConfig.js";


export const createUser = asyncHandler(async(req,res)=>{
    console.log("creating a User")

    let{email} = req.body

    // console.log(email)  
    const userExists = await prisma.user.findUnique({where:{email:email}})
    if(!userExists){
        const user = await prisma.user.create({data: req.body})
        res.send({
            message:"user registered successfully",
            user:user,
        });
    }else res.status(201).send({message:"User Already registered"});
});


// to took a a visit to resd 
export const bookVisit = asyncHandler(async(req,res)=>{
    const { email , date } = req.body;
    const {id} = req.params

    try{
        const alreadyBooked = await prisma.findUnique({
            where: {email},
            select: {bookedVisits: true},
        })
        if(alreadyBooked.bookVisits.some((visit)=> visit.id === id)){
            res.status(400).json({ message : "This residecy already booked by you"});
        }else{
            await prisma.user.update({
                where: {email:email},
                data: {
                    bookedVisits: {push : {id : id}},
                },
            });
            res.send("You Visit is Booked Successfully")
        }
    }
    catch(err){
        throw new Error(err.message)
    }
})